import mysql from "mysql";

export default class FollowDb {
    connection: mysql.Connection;
    constructor(connection: mysql.Connection) {
        this.connection = connection
    }

    async createAll() {
        await this.createTable()
        await this.createTriggers()
    }

    async createTable() {
        const createFollowTableSQL = `
            CREATE TABLE IF NOT EXISTS Follow (
                id INT AUTO_INCREMENT,
                follower INT NOT NULL,
                following INT NOT NULL,
                createAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                FOREIGN KEY (follower) REFERENCES user(id),
                FOREIGN KEY (following) REFERENCES user(id)
            );
        `

        this.connection.query(createFollowTableSQL, (err, _) => {
            if (err) {
                throw err
            } else {
                console.log("Table 'follow' created or exists")
            }
        })
    }

    async createTriggers() {
        const followTrigger = `
            CREATE TRIGGER IF NOT EXISTS Trg_follow_after_insert
            AFTER INSERT
            ON Follow
            FOR EACH ROW
            BEGIN
                UPDATE User
                SET
                following = (
                    case 
                    when id = NEW.follower
                    then following + 1
                    when id = NEW.following
                    then following
                    end
                ),
                followers = (
                    case
                    when id = NEW.following
                    then followers + 1
                    when id = NEW.follower
                    then followers
                    end
                )
                WHERE id in (NEW.follower, NEW.following);
                
            END;
        `

        this.connection.query(followTrigger, (err, _) => {
            if(err){
                throw err
            }else{
                console.log("Trigger AI follow created or exists")
            }
        })
        
        const unfollowTrigger = `
            CREATE TRIGGER IF NOT EXISTS Trg_unfollow_after_delete
            AFTER DELETE
            ON Follow
            FOR EACH ROW
            BEGIN
                
                UPDATE User
                SET
                following = following - 1
                WHERE
                id = OLD.follower;
                
                UPDATE User
                SET
                followers = followers - 1
                WHERE
                id = OLD.following;
            END;
        `

        this.connection.query(unfollowTrigger, (err, _) => {
            if(err){
                throw err
            }else{
                console.log("Trigger AD unfollow created or exists")
            }
        })
    }
}
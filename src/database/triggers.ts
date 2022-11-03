import mysql from 'mysql'

export const createTriggers = (connection: mysql.Connection) => {
    const dontCreateUserWithSameEmailTrigger = `
        CREATE TRIGGER IF NOT EXISTS Trg_user_before_insert 
        BEFORE INSERT
        ON user
        FOR EACH ROW
        BEGIN
            DECLARE usersWithSameEmail INT;

            SELECT COUNT(*)
            INTO usersWithSameEmail
            FROM user
            WHERE email = NEW.email OR username = NEW.username;

            IF usersWithSameEmail > 0
            THEN
            SIGNAL SQLSTATE '45000';
            END IF;
        END;
    `

    connection.query(dontCreateUserWithSameEmailTrigger, (err, _) => {
        if(err){
            throw err
        }else{
            console.log("Trigger BI same email created or exists")
        }
    })

    const followTrigger = `
        CREATE TRIGGER IF NOT EXISTS Trg_follow_after_insert
        AFTER INSERT
        ON follow
        FOR EACH ROW
        BEGIN
            UPDATE user
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

    connection.query(followTrigger, (err, _) => {
        if(err){
            throw err
        }else{
            console.log("Trigger AI follow created or exists")
        }
    })
    
    const unfollowTrigger = `
        CREATE TRIGGER IF NOT EXISTS Trg_unfollow_after_delete
        AFTER DELETE
        ON follow
        FOR EACH ROW
        BEGIN
            
            UPDATE user
            SET
            following = following - 1
            WHERE
            id = OLD.follower;
            
            UPDATE user
            SET
            followers = followers - 1
            WHERE
            id = OLD.following;
        END;
    `

    connection.query(unfollowTrigger, (err, _) => {
        if(err){
            throw err
        }else{
            console.log("Trigger AD unfollow created or exists")
        }
    })

}
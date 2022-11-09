import mysql from "mysql";

export default class PostDb {
    connection: mysql.Connection;
    constructor(connection: mysql.Connection) {
        this.connection = connection
    }

    async createAll() {
        await this.createTable()
        await this.createTriggers()
    }

    async createTable() {
        const createPostTableSQL = `
            CREATE TABLE IF NOT EXISTS Post (
                id INT AUTO_INCREMENT,
                image LONGBLOB NOT NULL,
                description VARCHAR(200) NOT NULL,
                location VARCHAR(150) NOT NULL,
                author INT NOT NULL,
                likes INT NOT NULL DEFAULT 0,
                comments INT NOT NULL DEFAULT 0,
                saves INT NOT NULL DEFAULT 0,
                shares INT NOT NULL DEFAULT 0,
                createAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            );
        `

        this.connection.query(createPostTableSQL, (err, _) => {
            if (err) {
                throw err
            } else {
                console.log("Table 'post' created or exists")
            }
        })
    }

    async createTriggers() {
        console.log("Trigger PostDB")
    }

}
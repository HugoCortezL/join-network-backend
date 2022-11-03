import mysql from "mysql";

export default class UserDb {
    connection: mysql.Connection;
    constructor(connection: mysql.Connection) {
        this.connection = connection
    }

    async createAll() {
        await this.createTable()
        await this.createTriggers()
    }

    async createTable() {
        const createUserTableSQL = `
        CREATE TABLE IF NOT EXISTS User (
            id INT AUTO_INCREMENT,
            fullname VARCHAR(100) NOT NULL,
            username VARCHAR(20) NOT NULL,
            bio VARCHAR(255) DEFAULT '',
            image LONGBLOB,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(30) NOT NULL,
            phone CHAR(11) DEFAULT '',
            birthdate DATE,
            gender ENUM('Male', 'Female', 'Other'),
            token varchar(100) DEFAULT '',
            posts INT DEFAULT 0,
            followers INT DEFAULT 0,
            following INT DEFAULT 0,
            PRIMARY KEY (id)
        );
        `
        this.connection.query(createUserTableSQL, (err, _) => {
            if(err){
                throw err
            }else{
                console.log("Table 'user' created or exists")
            }
        })
    }

    async createTriggers() {
        const dontCreateUserWithSameEmailTrigger = `
            CREATE TRIGGER IF NOT EXISTS Trg_user_before_insert 
            BEFORE INSERT
            ON User
            FOR EACH ROW
            BEGIN
                DECLARE usersWithSameEmail INT;

                SELECT COUNT(*)
                INTO usersWithSameEmail
                FROM User
                WHERE email = NEW.email OR username = NEW.username;

                IF usersWithSameEmail > 0
                THEN
                SIGNAL SQLSTATE '45000';
                END IF;
            END;
        `

        this.connection.query(dontCreateUserWithSameEmailTrigger, (err, _) => {
            if(err){
                throw err
            }else{
                console.log("Trigger BI same email created or exists")
            }
        })
    }
}
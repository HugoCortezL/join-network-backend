import mysql from 'mysql'

export const createTables = (connection: mysql.Connection) => {
    const createUserTableSQL = `
    CREATE TABLE IF NOT EXISTS user (
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
    connection.query(createUserTableSQL, (err, _) => {
        if(err){
            throw err
        }else{
            console.log("Table 'user' created or exists")
        }
    })

    const createFollowTableSQL = `
        CREATE TABLE IF NOT EXISTS follow (
            id INT AUTO_INCREMENT,
            follower INT NOT NULL,
            following INT NOT NULL,
            createAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            FOREIGN KEY (follower) REFERENCES user(id),
            FOREIGN KEY (following) REFERENCES user(id)
        );
    `

    connection.query(createFollowTableSQL, (err, _) => {
        if(err){
            throw err
        }else{
            console.log("Table 'follow' created or exists")
        }
    })
}

import mysql from 'mysql'
import dotenv from 'dotenv';
import UserDb from '../components/User/userDB';
import FollowDb from '../components/Follow/followDB';
dotenv.config();

export const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

connection.connect(function (err) {
    if (err) {
        console.log("Can't connect with database 'joinnetwork'")
    } else {
        console.log("Connected to database 'joinnetwork'")
    }
})

const userDb = new UserDb(connection)
const followDb = new FollowDb(connection)

const createAll = async () => {
    await userDb.createAll()
    await followDb.createAll()
}

createAll()
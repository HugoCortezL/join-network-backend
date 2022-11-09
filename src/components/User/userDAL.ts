import { connection } from '../../database';
import { User, UserInput, UserLogin } from './user';
import { v4 } from 'uuid'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default class UserDAL {

    async getAll(): Promise<[User]> {
        const sqlQuery = "SELECT id, fullname, username, image FROM User"
        const getUsersPromise: Promise<[User]> = new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, users) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(users)
                }
            })
        })
        const users = await getUsersPromise
        return users
    }

    async getById(userId: number): Promise<User> {
        const sqlQuery = `
        SELECT id, fullname, username, bio, image, posts, followers, following 
        FROM User
        WHERE id = ${userId}
        `
        const getUser: Promise<User> = new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, users) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(users)
                }
            })
        })
        const user = await getUser
        return user
    }

    async create(user: UserInput): Promise<User> {
        const sqlQuery = `
        INSERT INTO User
        (fullname, username, email, password)
        VALUES
        ('${user.fullname}', '${user.username}', '${user.email}', '${user.password}')
        `
        const createUsersPromise: Promise<User> = new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, user) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(user)
                }
            })
        })
        const userCreated = await createUsersPromise
        return userCreated
    }

    async update(user: User): Promise<User> {
        const sqlQuery = `
            UPDATE User
            SET
            fullname = '${user.fullname}',
            username = '${user.username}',
            bio = '${user.bio}',
            image = ${user.image},
            email = '${user.email}',
            phone = '${user.phone}',
            birthdate = ${user.birthdate},
            gender = ${user.gender}
            WHERE
            id = ${user.id}
        `
        const updateUsersPromise: Promise<User> = new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, user) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(user)
                }
            })
        })
        const userUpdated = await updateUsersPromise
        return userUpdated
    }

    async beforeLogin(user: UserLogin) {
        const sqlQuery = `
            UPDATE User
            SET
            token = '${v4()}'
            WHERE email = '${user.email}' AND password = '${user.password}'
        `
        const beforeLoginPromise = new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, user) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(user)
                }
            })
        })
        await beforeLoginPromise
    }

    async login(user: UserLogin): Promise<String> {
        await this.beforeLogin(user)
        const sqlQuery = `
        SELECT id, fullname, image, token 
        FROM User
        WHERE email = '${user.email}' AND password = '${user.password}'
        LIMIT 1
        `
        const loginPromise: Promise<[User]> = new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, user) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(user)
                }
            })
        })
        const userLogedin = await loginPromise
        let token = ''
        if (userLogedin && userLogedin.length > 0 && process.env.SECRET_KEY){
            const finalUser = {
                id: userLogedin[0].id,
                fullname: userLogedin[0].fullname,
                image: userLogedin[0].image,
                token: userLogedin[0].token
            }
            token = jwt.sign(finalUser, process.env.SECRET_KEY);
        }
        return token
    }
}
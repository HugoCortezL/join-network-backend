import {connection} from '../../database';
import { User, UserInput } from './user';

export default class UserDAL {

    async getAll(): Promise<[User]> {
        const sqlQuery = "SELECT * FROM User"
        const getUsersPromise: Promise<[User]> = new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, users) => {
                if(err){
                    reject(err)
                }else{
                    resolve(users)
                }
            })
        })
        const users = await getUsersPromise
        return users
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
                if(err){
                    reject(err)
                }else{
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
                if(err){
                    reject(err)
                }else{
                    resolve(user)
                }
            })
        })
        const userUpdated = await updateUsersPromise
        return userUpdated
    }
}
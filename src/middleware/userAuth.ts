import { connection } from '../database';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from "jsonwebtoken"
import dotenv from 'dotenv';
import { User } from 'src/components/User';
dotenv.config();

export const authenticateUser = async (webToken: string) => {
    if (process.env.SECRET_KEY) {
        try {
            const decoded = jwt.verify(webToken, process.env.SECRET_KEY) as JwtPayload
            const sqlQuery = `
            SELECT fullname
            FROM User
            WHERE id = ${decoded.id} AND token = '${decoded.token}'
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
            if(user){
                return true
            }
        }
        catch (e) {
            return false
        }
    }
    return false
}
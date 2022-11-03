import {connection} from '../../database';

export default class FollowDAL {

    async follow(follower: number, following: number): Promise<void> {
        const sqlQuery = `
        INSERT INTO follow
        (follower, following)
        VALUES
        (${follower}, ${following})
        `
        console.log(sqlQuery)
        const followPromise = new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, success) => {
                if(err){
                    reject(err)
                }else{
                    resolve(success)
                }
            })
        })
        await followPromise
    }
    
    async unfollow(follower: number, following: number): Promise<void> {
        const sqlQuery = `
        DELETE FROM follow
        WHERE
        follower = ${follower}
        AND
        following = ${following}
        `
        const unfollowPromise = new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, success) => {
                if(err){
                    reject(err)
                }else{
                    resolve(success)
                }
            })
        })
        await unfollowPromise
    }

}
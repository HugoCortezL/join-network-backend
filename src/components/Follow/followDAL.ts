import { connection } from '../../database';
import { UserView } from '../User';

export default class FollowDAL {

    async follow(follower: number, following: number): Promise<void> {
        const sqlQuery = `
        INSERT INTO Follow
        (follower, following)
        VALUES
        (${follower}, ${following})
        `
        const followPromise = new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, success) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(success)
                }
            })
        })
        await followPromise
    }

    async unfollow(follower: number, following: number): Promise<void> {
        const sqlQuery = `
        DELETE FROM Follow
        WHERE
        follower = ${follower}
        AND
        following = ${following}
        `
        const unfollowPromise = new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, success) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(success)
                }
            })
        })
        await unfollowPromise
    }

    async getFollowers(userId: number): Promise<UserView[]> {
        const sqlQuery = `
            SELECT User.id, User.username, User.image, User.fullname
            FROM Follow
            INNER JOIN User ON User.id = Follow.follower
            WHERE Follow.following = ${userId}
        `
        const getFollowersPromise: Promise<UserView[]> = new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, success) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(success)
                }
            })
        })
        const followers = await getFollowersPromise
        return followers
    }

    async getFollowings(userId: number): Promise<UserView[]> {
        const sqlQuery = `
        SELECT User.id, User.username, User.image, User.fullname
        FROM Follow
        INNER JOIN User ON User.id = Follow.following
        WHERE Follow.follower = ${userId}
        `
        const getFollowingsPromise: Promise<UserView[]> = new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, success) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(success)
                }
            })
        })
        const followings = await getFollowingsPromise
        return followings
    }

}
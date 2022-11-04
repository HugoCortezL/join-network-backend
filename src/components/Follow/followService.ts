import { UserView } from '../User'
import FollowDAL from './followDAL'

export default class FollowService {
    followDal: FollowDAL
    constructor() {
        this.followDal = new FollowDAL()
    }

    async follow(follower: number, following: number): Promise<void> {
        try {
            await this.followDal.follow(follower, following)
        }
        catch (e: any) {
            return e
        }
    }

    async unfollow(follower: number, following: number): Promise<void> {
        try {
            await this.followDal.unfollow(follower, following)
        }
        catch (e: any) {
            return e
        }
    }

    async getFollowers(userId: number): Promise<UserView[]> {
        try {
            const followers = await this.followDal.getFollowers(userId)
            return followers
        }
        catch (e: any) {
            return e
        }
    }

    async getFollowings(userId: number): Promise<UserView[]> {
        try {
            const followings = await this.followDal.getFollowings(userId)
            return followings
        }
        catch (e: any) {
            return e
        }
    }
}
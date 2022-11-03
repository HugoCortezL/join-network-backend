import FollowDAL from './followDAL'

export default class FollowService {
    followDal: FollowDAL
    constructor() {
        this.followDal = new FollowDAL()
    }

    async follow(follower: number, following: number): Promise<void> {
        try{
            await this.followDal.follow(follower, following)
        }
        catch(e: any){
            return e
        }
    }
    
    async unfollow(follower: number, following: number): Promise<void> {
        try{
            await this.followDal.unfollow(follower, following)
        }
        catch(e: any){
            return e
        }
    }
}
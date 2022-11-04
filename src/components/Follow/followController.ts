import { Request, Response } from 'express';
import FollowService from './followService';
import { createApiResponse, Status } from '../../utils/ApiResponse';

export default class FollowController {
    followService: FollowService;
    constructor() {
        this.followService = new FollowService()
    }

    async follow(req: Request, res: Response) {
        const service = new FollowService()
        const follower = req.headers.user_id
        const following = req.params.followingId
        try {
            if (follower && following) {
                await service.follow(+follower, +following)
                const response = createApiResponse({}, "Success to follow the user", Status.Success)
                res.status(201).send(response)
            }
            else {
                const response = createApiResponse({}, "Cant follow the user", Status.Error)
                res.status(409).send(response)
            }
        }
        catch (e) {
            console.log(e)
            const response = createApiResponse(null, "Error to follow the user", Status.Error)
            res.status(400).send(response)
        }
    }

    async unfollow(req: Request, res: Response) {
        const service = new FollowService()
        const follower = req.headers.user_id
        const following = req.params.followingId
        try {
            if (follower && following) {
                await service.unfollow(+follower, +following)
                const response = createApiResponse({}, "Success to unfollow the user", Status.Success)
                res.status(200).send(response)
            }
            else {
                const response = createApiResponse({}, "Cant unfollow the user", Status.Error)
                res.status(409).send(response)
            }
        }
        catch (e) {
            console.log(e)
            const response = createApiResponse(null, "Error to unfollow the user", Status.Error)
            res.status(400).send(response)
        }
    }

    async getFollowers(req: Request, res: Response) {
        const service = new FollowService()
        const userId = req.params.userId
        try {
            if (userId) {
                const followers = await service.getFollowers(+userId)
                const response = createApiResponse(followers, "Success to retrieve the followers", Status.Success)
                res.status(200).send(response)
            }
            else {
                const response = createApiResponse({}, "Cant retrieve the followers", Status.Error)
                res.status(409).send(response)
            }
        }
        catch (e) {
            console.log(e)
            const response = createApiResponse(null, "Error to retrieve the followers", Status.Error)
            res.status(400).send(response)
        }
    }

    async getFollowings(req: Request, res: Response) {
        const service = new FollowService()
        const userId = req.params.userId
        try {
            if (userId) {
                const followings = await service.getFollowings(+userId)
                const response = createApiResponse(followings, "Success to retrieve the followings", Status.Success)
                res.status(200).send(response)
            }
            else {
                const response = createApiResponse({}, "Cant retrieve the followings", Status.Error)
                res.status(409).send(response)
            }
        }
        catch (e) {
            console.log(e)
            const response = createApiResponse(null, "Error to retrieve the followings", Status.Error)
            res.status(400).send(response)
        }
    }
}
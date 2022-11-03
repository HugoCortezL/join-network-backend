import express from 'express'
import FollowController from './followController'


export const followRouter = express.Router()

const followController = new FollowController()

followRouter.post("/user/:followingId/follow", followController.follow)
followRouter.delete("/user/:followingId/unfollow", followController.unfollow)

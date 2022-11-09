import express from 'express'
import PostController from './postController'

export const postRouter = express.Router()

const postController = new PostController()

postRouter.get("/posts", postController.getAll)
postRouter.post("/post", postController.create)
postRouter.put("/post", postController.update)
postRouter.delete("/post/{postId}", postController.create)

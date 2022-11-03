import express from 'express'
import UserController from './userController'

export const userRouter = express.Router()

const userController = new UserController()

userRouter.get("/user", userController.getAll)
userRouter.post("/user", userController.create)
userRouter.put("/user", userController.update)
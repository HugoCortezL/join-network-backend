import { Request, Response } from 'express';
import UserService from './userService';
import { createApiResponse, Status } from '../../utils/ApiResponse';

export default class UserController {
    userService: UserService;
    constructor() {
        this.userService = new UserService()
    }

    async getAll(_: Request, res:Response) {
        const service = new UserService()
        try{
            const users = await service.getAll()
            const response = createApiResponse(users, "Success to get all users", Status.Success)
            res.status(200).send(response)
        }
        catch(e){
            console.log(e)
            const response = createApiResponse(null, "Error to get all users", Status.Error)
            res.status(400).send(response)
        }
    }

    async create(req: Request, res: Response) {
        const service = new UserService()
        const user = req.body
        try{
            const result = await service.create(user)
            if (result.hasOwnProperty("sqlState")){
                const response = createApiResponse({}, "Already a user with this email or username", Status.Error)
                res.status(409).send(response)
            }
            const response = createApiResponse({}, "Success to create the user", Status.Success)
            res.status(201).send(response)
        }
        catch(e){
            console.log(e)
            const response = createApiResponse(null, "Error to create the user", Status.Error)
            res.status(400).send(response)
        }
    }
    
    async update(req: Request, res: Response) {
        const service = new UserService()
        const user = req.body
        try{
            await service.update(user)
            const response = createApiResponse({}, "Success to update the user", Status.Success)
            res.status(200).send(response)
        }
        catch(e){
            console.log(e)
            const response = createApiResponse(null, "Error to update the user", Status.Error)
            res.status(400).send(response)
        }
    }

}
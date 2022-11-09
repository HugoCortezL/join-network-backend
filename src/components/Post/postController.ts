import { Request, Response } from 'express';
import PostService from './postService';
import { createApiResponse, Status } from '../../utils/ApiResponse';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

export default class PostController {
    postService: PostService;
    constructor() {
        this.postService = new PostService()
    }

    async getAll(_: Request, res: Response) {
        const service = new PostService()
        try {
            const posts = await service.getAll()
            const response = createApiResponse(posts, "Success to get all posts", Status.Success)
            res.status(200).send(response)
        }
        catch (e) {
            console.log(e)
            const response = createApiResponse(null, "Error to get all posts", Status.Error)
            res.status(400).send(response)
        }
    }

    async create(req: Request, res: Response) {
        const webToken = req.headers.web_token
        let author = ''
        if (webToken && typeof webToken === 'string' && process.env.SECRET_KEY){
            const decoded = jwt.verify(webToken, process.env.SECRET_KEY) as JwtPayload
            author = decoded.id
        }
        const service = new PostService()
        const post = req.body
        try {
            await service.create(post, +author)
            const response = createApiResponse({}, "Success to create the post", Status.Success)
            res.status(201).send(response)
        }
        catch (e) {
            console.log(e)
            const response = createApiResponse(null, "Error to create the post", Status.Error)
            res.status(400).send(response)
        }
    }

    async update(req: Request, res: Response) {
        const service = new PostService()
        const post = req.body
        try {
            await service.update(post)
            const response = createApiResponse({}, "Success to update the post", Status.Success)
            res.status(201).send(response)
        }
        catch (e) {
            console.log(e)
            const response = createApiResponse(null, "Error to update the post", Status.Error)
            res.status(400).send(response)
        }
    }

    async delete(req: Request, res: Response) {
        const webToken = req.headers.web_token
        let author = ''
        if (webToken && typeof webToken === 'string' && process.env.SECRET_KEY){
            const decoded = jwt.verify(webToken, process.env.SECRET_KEY) as JwtPayload
            author = decoded.id
        }
        const service = new PostService()
        const postId = req.params.postId
        try {
            if(postId){
                await service.delete(+postId, +author)
                const response = createApiResponse({}, "Success to delete the post", Status.Success)
                res.status(201).send(response)
            }
        }
        catch (e) {
            console.log(e)
            const response = createApiResponse(null, "Error to delete the post", Status.Error)
            res.status(400).send(response)
        }
    }

}
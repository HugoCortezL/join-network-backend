import {Post, PostInput} from './post'
import PostDAL from './postDAL';

export default class PostService {

    postDal: PostDAL
    constructor() {
        this.postDal = new PostDAL()
    }

    async getAll(): Promise<[Post]> {
        try {
            const posts = await this.postDal.getAll()
            return posts
        }
        catch (e: any) {
            throw new Error(e)
        }
    }

    async create(post: PostInput, author: number): Promise<Post> {
        try {
            const postCreated = await this.postDal.create(post, author)
            return postCreated
        }
        catch (e: any) {
            return e
        }
    }
    
    async update(post: Post): Promise<void> {
        try {
            await this.postDal.update(post)
        }
        catch (e: any) {
            return e
        }
    }

    async delete(postId: number, author: number): Promise<void> {
        try {
            await this.postDal.delete(postId, author)
        }
        catch (e: any) {
            return e
        }
    }


}
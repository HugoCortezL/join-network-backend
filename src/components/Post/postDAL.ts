import { connection } from '../../database';
import {Post, PostInput} from './post'

export default class UserDAL {

    async getAll(): Promise<[Post]> {
        console.log("Chegou")
        const sqlQuery = `
            SELECT id, image, description, location, author, createAt 
            FROM Post
            ORDER BY createAt DESC
        `
        const getPostsPromise: Promise<[Post]> = new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, posts) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(posts)
                }
            })
        })
        const posts = await getPostsPromise
        return posts
    }

    async create(post: PostInput, author: number): Promise<Post> {
        const sqlQuery = `
        INSERT INTO Post
        (image, description, location, author)
        VALUES
        ('${post.image}', '${post.description}', '${post.location}', ${author})
        `
        console.log(sqlQuery)
        const createPostPromise: Promise<Post> = new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, post) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(post)
                }
            })
        })
        const postCreated = await createPostPromise
        return postCreated
    }

    async update(post: Post): Promise<void> {
        const sqlQuery = `
            UPDATE Post
            SET
            description = '${post.description}',
            location = '${post.location}'
            WHERE
            id = ${post.id}
        `
        const updatePostPromise: Promise<Post> = new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, user) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(user)
                }
            })
        })
        await updatePostPromise
    }

    async delete(postId: number, author: number): Promise<void> {
        const sqlQuery = `
        DELETE FROM Post
        WHERE
        id = ${postId}
        AND
        author = ${author}
        `
        const deletePostPromise: Promise<Post> = new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, user) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(user)
                }
            })
        })
        await deletePostPromise
    }
}
export type Post = {
    id: number,
    image: any,
    description: string,
    location: string,
    author: number,
    likes: number,
    comments: number,
    saves: number,
    shares: number,
    createAt: Date
}

export type PostInput = {
    image: any,
    description: string,
    location: string
}
export enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}

export type User = {
    id: number,
    fullname: string,
    username: string,
    bio: string,
    image: any,
    email: string,
    password: string,
    phone: string,
    birthdate: string,
    gender: Gender,
    token: string,
    posts: number,
    followers: number,
    following: number
}

export type UserInput = {
    fullname: string,
    username: string,
    email: string,
    password: string
}

export type UserView = {
    id: number,
    fullname: string,
    username: string,
    image: any
}
import { User, UserInput, UserLogin } from './user';
import UserDAL from './userDAL';

export default class UserService {

    userDal: UserDAL
    constructor() {
        this.userDal = new UserDAL()
    }

    async getAll(): Promise<[User]> {
        try {
            const users = await this.userDal.getAll()
            return users
        }
        catch (e: any) {
            throw new Error(e)
        }
    }

    async getById(userId: number): Promise<User> {
        try {
            const user = await this.userDal.getById(userId)
            return user
        }
        catch (e: any) {
            throw new Error(e)
        }
    }

    async create(user: UserInput): Promise<User> {
        try {
            const userCreated = await this.userDal.create(user)
            return userCreated
        }
        catch (e: any) {
            return e
        }
    }

    async update(user: User): Promise<User> {
        try {
            const userUpdated = await this.userDal.update(user)
            return userUpdated
        }
        catch (e: any) {
            return e
        }
    }

    async login(user: UserLogin): Promise<[User]> {
        try {
            const userLogedin = await this.userDal.login(user)
            return userLogedin
        }
        catch (e: any) {
            return e
        }
    }

}
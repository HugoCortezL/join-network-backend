import express, { Express, Response } from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import { userRouter } from './components/User';
import { followRouter } from './components/Follow';
import { postRouter } from './components/Post';

dotenv.config();

export const app: Express = express()
const port = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/v1', userRouter)
app.use('/api/v1', followRouter)
app.use('/api/v1', postRouter)


app.get("/", (_, res: Response) => {
    res.send("Express + TypeScript Server")
})


const server = app.listen(port, () => {
    console.log(`Server ir running at http://localhost:${port}/`)
})

server.timeout = 1000;
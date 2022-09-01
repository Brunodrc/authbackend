import express, { NextFunction, Request, Response } from "express"
import { router } from "./routes"
import "express-async-errors"

const app = express()
app.use(express.json())
const port = 3333

app.use(router)

app.use(
    (error: Error, request:Request, response: Response, next: NextFunction)=>{
        return response.json({
            status: "Error",
            message: error.message,
    })
})

app.listen(port, ()=> console.log("Server is running in http://localhost:3333"))
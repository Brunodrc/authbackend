import { Request, Response } from "express";
import { CreateUser } from "./createUser";


class ControllerCreateUser {

    async handle(request: Request, response: Response){
        const {name, email, password} = request.body

        const createUser = new CreateUser()

        const user = await createUser.execute({
            name,
            email,
            password,
        })

        return response.json(user)

    }
}

export {ControllerCreateUser}
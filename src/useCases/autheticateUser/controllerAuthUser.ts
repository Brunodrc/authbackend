import { Request, Response } from "express";
import { AuthenticateUse } from "./authenticateUser";


class ControllerAuthUser {

    async handle(request: Request, response:Response){
        const {email, password} = request.body

        const authenticateUse = new AuthenticateUse()

        const token = authenticateUse.execute({
            email,
            password
        })

        return response.json((await token))
    }
}

export { ControllerAuthUser}
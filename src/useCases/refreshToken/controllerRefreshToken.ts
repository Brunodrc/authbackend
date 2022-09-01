import { Request, Response } from "express";
import { RefreshtokenUser } from "./refreshtoken";


class ControllerRefreshToken {

    async handle(request:Request, response: Response){
        const {refresh_token} = request.body

        const refreshToken = new RefreshtokenUser()

        const token = refreshToken.execute(refresh_token)

        //console.log(token);
        

        return response.json((await token))
    }
}

export {ControllerRefreshToken}
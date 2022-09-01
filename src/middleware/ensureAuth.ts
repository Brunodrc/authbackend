import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { secretPrivetKey } from "../useCases/autheticateUser/authenticateUser";

export function ensureAuth(request:Request, response: Response, next: NextFunction){

    const authtoken = request.headers.authorization

    if(!authtoken){
        return response.status(401).json({msg: "Token is missing."})
    }

    const [typeAuth, token] = authtoken.split(' ')

    try{
        verify(token, secretPrivetKey)

        return next()

    }catch(err){
        return response.status(401).json({msg:"Invalid token."})
    }

}

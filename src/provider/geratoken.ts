import { sign } from "jsonwebtoken"
import { secretPrivetKey } from "../useCases/autheticateUser/authenticateUser"


class GenereteToken{
    
    async execute(userId: string){
        const token = sign({},secretPrivetKey,{
            subject: userId,
            expiresIn: "20s",
        })
        //console.log(token);
        
        return token
    }
}

export { GenereteToken}
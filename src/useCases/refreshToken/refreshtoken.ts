import { client } from "../../prisma/client"
import { GenereteToken } from "../../provider/geratoken"


class RefreshtokenUser{

    async execute(Refresh_token: string){

        const refreshToken = await client.refreshToken.findFirst({
            where: {
                id: Refresh_token
            }
        })
        if(!refreshToken){
            throw new Error("Invalid Refresh Token")
        }

        const generateToken = new GenereteToken()
        const token = await generateToken.execute(refreshToken.userId)

        //console.log(token);
        

        return {token}
    }
}

export {RefreshtokenUser}
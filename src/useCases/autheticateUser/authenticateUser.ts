import { client } from "../../prisma/client"
import {compare} from "bcryptjs"
import {sign} from "jsonwebtoken"
import { GeraRefreshToken } from "../../provider/geraRefreshToken"
import { GenereteToken } from "../../provider/geratoken"

interface IRequest {
    email: string
    password: string
}
const secretPrivetKey = 'tokendoido'
class AuthenticateUse {

    async execute({email,password}:IRequest){
        //usuario existe?
        const useralreadyExist = await client.user.findFirst({
            where:{
                email
            }
        })
        if(!useralreadyExist){
            throw new Error("Email or password invalid.")
        }

        //a senha está correta?
        const passMatch = await compare(password, useralreadyExist.password)
        if(!passMatch){
            throw new Error("Email or password invalid.")
        }
        const username = useralreadyExist.name
        
        //gerar o token!!!!!
        const generateToken = new GenereteToken()
        const token = await generateToken.execute(useralreadyExist.id)

        await client.refreshToken.deleteMany({
            where:{
                userId: useralreadyExist.id
            }
        })

        const generateRefreshToken = new GeraRefreshToken()

        const refreshToken = await generateRefreshToken.execute(useralreadyExist.id)

        return {token, refreshToken}
    }
}

export {AuthenticateUse, secretPrivetKey}
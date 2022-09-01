import { client } from "../prisma/client"
import dayjs from "dayjs"


class GeraRefreshToken{
    async execute(userId: string){

        const expiresIn = dayjs().add(15, 'second').unix()

        const geraRToken = await client.refreshToken.create({
            data:{
                userId,
                expiresIn
            },
        })

        return geraRToken
    }
}

export {GeraRefreshToken}
import {client} from "../../prisma/client"
import {hash} from "bcryptjs"

interface IUser {
    name: string
    email: string
    password: string
}

class CreateUser{

    async execute({name, email, password}: IUser){

        //verificar se usuario exist
        const userAlreadyExists = await client.user.findFirst({
            where: {
                email
            }
        })
        if(userAlreadyExists) {
            throw new Error("User already exist.")
        }
        //criptografar a senha
        const passHash = await hash(password, 8)
        //cadastra o usuario
        const user = await client.user.create({
            data:{
                name,
                email,
                password:passHash
            }
        })

        return user

    }
}

export {CreateUser}
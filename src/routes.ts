import { Router } from "express";
import { ensureAuth } from "./middleware/ensureAuth";
import { ControllerAuthUser } from "./useCases/autheticateUser/controllerAuthUser";
import { ControllerCreateUser } from "./useCases/createUser/controllercreateUser";
import { ControllerRefreshToken } from "./useCases/refreshToken/controllerRefreshToken";

const router = Router()
const controllerCreateUser = new ControllerCreateUser()
const controllerAuthUser = new ControllerAuthUser()
const controllerRefreshToken = new ControllerRefreshToken()

router.post('/cadastro', controllerCreateUser.handle)
router.post('/login', controllerAuthUser.handle)
router.post('/refresh-token',controllerRefreshToken.handle)

//testar o token
router.get('/listaposts', ensureAuth, (req, res)=>{
    return res.json([
        {id: 1, post: "primeira postagem", curtidas: 0},
        {id: 2, post: "segunda postagem", curtidas: 1},
        {id: 3, post: "testando a postagem", curtidas: 0},
        {id: 4, post: "quarto teste de postagem", curtidas: 2},
        {id: 5, post: "quinta postagem", curtidas: 3},
    ])
})


export {router}
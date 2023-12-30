import { Router } from 'express';
import { userModel } from '../services/dao/models/user.model.js';
import { generateJWToken, isValidPassword } from '../utils.js';
import cookieParser from "cookie-parser";

const router = Router();

router.use(cookieParser())

export const loginController = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email: email })
        if (!user) {
            console.warn("User doesn't exists with username: " + email);
            return res.status(204).send({ error: "Not found", message: "Usuario no encontrado con username: " + email });
        }

        if (!isValidPassword(user, password)) {
            console.warn("Invalid credentials for user: " + email);
            return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
        }

        const tokenUser = {
            id: user.__id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role
        }

        const access_token = generateJWToken(tokenUser)
    
        // // 1ro LocalStorage
        // res.send({ message: "Login successful!", jwt: access_token })

        // 2do con cookie
    
        res.cookie('jwtCookieToken', access_token, {
            maxAge: 86400000, // 1 día en milisegundos
            httpOnly: true
        }).send({ id: user._id })

    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "error", error: "Error interno de la applicacion." });
    }

}



export default router;
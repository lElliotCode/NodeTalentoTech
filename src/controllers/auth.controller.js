import { UserModel, findOne } from "../models/user.js";
import { validateUser } from "../schemas/user.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    const { token, user } = await UserModel.login({ email, password });

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax', // funciona bien en localhost
        secure: process.env.NODE_ENV === 'production', // solo en producción
        maxAge: 60 * 60 * 1000 // 1 hora
      });

    res.json({ token, user })
}

export const register = async (req, res) => {
    const result = validateUser(req.body);
    if (!result.success) {
        return res.status(400).json({ message: JSON.parse(result.error.message) });
    }
    try {
        const userFound = await findOne({ email: result.data.email });
        if (userFound) return res.status(400).json({ message: "User already exists" });
        const { name, email, password } = result.data;
        const user = await UserModel.register({ name, email, password });
        res.json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    res.sendStatus(200)
}

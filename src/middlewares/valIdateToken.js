import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const authRequired = (req, res, next) => {

    const { token } = req.cookies
    console.log(token)

    if(!token){
        return res.status(401).json({ message: "No token, authorization denied" })
    }

    jwt.verify(token, process.env.JWT_SECRET || "defaultSecret", (err, user) => {

        if(err){
            return res.status(403).json({ message : "Invalid Token"})
        }

        req.user = user

        next();
    })

}
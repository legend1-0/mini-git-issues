import jwt from "jsonwebtoken"
import { prisma } from "../db/client.js"
import { log } from "console"

export const authMiddleware = async (req, res, next)=>{
    
    
    console.log(`Auth middleware reached`);
    let token;
if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    token = req.headers.authorization.split(" ")[1]
} else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
}

if(!token){
    return res.status(401).json(`nOt authorized no toekn provided`)
}

try{
const decoded = jwt.verify(token, process.env.JWT_SECRET)    

const user = await prisma.user.findUnique({
    where: {id: decoded.id},
})

if(!user) {
    return res.status(401).json(`User no longer exist`)
}
req.user = user
next()
}
catch(err){
    return res.status(401).json(`Not authorised token failed`)

}
}
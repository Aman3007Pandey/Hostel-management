import jwt from "jsonwebtoken";

 export const createJWT = ({payload})=>{
    const token =  jwt.sign(payload,'jwtSecret',{expiresIn: '5d'});
    return token
 }
export const isTokenValid = ({token})=>{
   return jwt.verify(token,'jwtSecret');
 }
let d=1000*60*60*24;

export const attachCookiesToResponse = ({res,user})=>{
    const token = createJWT({payload: user});
    console.log(token);
    res.cookie('token',token,{
        httpOnly: true,
        expires: new Date(Date.now() + 5* 24 * 60 * 60 * 1000),
    });
    return token;
 }
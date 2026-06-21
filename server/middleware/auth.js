import jwt from 'jsonwebtoken' 
import dotenv from 'dotenv'
dotenv.config();
 export const protect =  (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({error: Unauthorised})
        };

        const token = authHeader.split(' ')[1]
        const session = jwt.verify(token, process.env.JWT_SECRET );
        if(!session){
            return res.status(401).json({error: Unauthorised})
        }
        req.session = session;
        next()
    } catch (error) {
        return res.status(401).json({error: 'Unauthorised'})
    }
 };

 export const protectAdmin = (req, res,next)=>{
    if(req?.session?.role  !== 'ADMIN'){
        return res.status(403).json({error: 'Admin access required'})
    }
    next()
 }
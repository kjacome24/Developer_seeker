import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRETKEY = process.env.SECRETKEY;

const tokenValidator = (req, res, next) => {
    const {user_token} = req.headers;

    jwt.verify(user_token, SECRETKEY, (error, decoded) => {
        if(error){
            res.statusMessage = "Invalid token";
            return res.status(401).json({message: 'You are not authorized, invalid token'});
        }
        req.userInformation = decoded;
        next();
    });
};


export default tokenValidator;
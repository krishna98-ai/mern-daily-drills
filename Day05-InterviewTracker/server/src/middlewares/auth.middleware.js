import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import  {AsyncHandler} from "../utils/AsyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
const verifyJWT=  AsyncHandler(async (req, res, next) => {
    try{
const token = req?.cookies.accessToken || req?.headers.authorization?.split(' ')[1];
    if (!token) {
        return next(new ApiError(401, 'Unauthorized: No token provided'));
    }
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return next(new ApiError(401, 'Unauthorized: User not found'));
        }
        req.user = user;
        next();
    }
    catch(err){
        return next(new ApiError(401, 'Unauthorized: Invalid token'));
    }
})
export default verifyJWT
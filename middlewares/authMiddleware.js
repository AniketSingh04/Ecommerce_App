import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes-token based
export const requireSignIn = async (req, res, next) => {
    try {
        // Verify the token from the request headers
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        // If token is valid, proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Log any errors that occur
        console.log(error);
        
        // Optionally, you can send an error response here if token verification fails
        res.status(401).send({
            success: false,
            message: "Unauthorized access"
        });
    }
};

//admin access
export const isAdmin = async (req, res, next)=>{
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role != 1){
            return res.status(401).send({
                success: false,
                message: "Unauthorized access"
            })
        }else{
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Unauthorized access"
        })
    }
}
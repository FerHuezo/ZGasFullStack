import dotenv from "dotenv";

dotenv.config();

export const config = {
    db : {
        URI : process.env.URI
    },
    server : {
        PORT : process.env.PORT
    },
    JWT:{
        secret : process.env.JWT_SECRET,
        expiresIn : process.env.JWT_EXPIRES
    },
    credentials : {
        email : process.env.ADMIN_EMAIL,
        password : process.env.ADMIN_PASS
    },
    nodemailer : {
        user : process.env.USER_EMAIL, 
        pass : process.env.PASS_EMAIL
    }
};
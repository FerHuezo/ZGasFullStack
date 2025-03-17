import dotenv from "dotenv";

dotenv.config();

export const config = {
    db : {
        URI : process.env.URI
    },
    server : {
        PORT : process.env.PORT
    }
};
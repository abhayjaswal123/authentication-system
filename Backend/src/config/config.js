import dotenv from 'dotenv';
dotenv.config();

if(!process.env.PORT){
    console.log("MONGO_URI is not exist in your env variables")
}

if(!process.env.CLIENT_URL){
    console.log("CLIENT_URL is not exist in your env variables")
}

if(!process.env.MONGO_URI){
    console.log("MONGO_URI is not exist in your env variables")
}

if(!process.env.REFRESH_JWT_SECRET){
    console.log("REFRESH_JWT_SECRET is not exist in your env variables")
}

if(!process.env.ACCESS_JWT_SECRET){
    console.log("REFRESH_JWT_SECRET is not exist in your env variables")
}

if(!process.env.GOOGLE_CLIENT_ID){
    console.log("GOOGLE_CLIENT_ID is not defined in environment variables");
    process.exit(1);
}

if(!process.env.GOOGLE_CLIENT_SECRET){
    console.log("GOOGLE_CLIENT_SECRET is not defined in environment variables");
    process.exit(1);
}

if(!process.env.GOOGLE_REFRESH_TOKEN){
    console.log("GOOGLE_REFRESH_TOKEN is not defined in environment variables");
    process.exit(1);
}

if(!process.env.GOOGLE_USER){
    console.log("GOOGLE_USER is not defined in environment variables");
    process.exit(1);
}

const config ={
    PORT: process.env.PORT,
    MONGO_URI : process.env.MONGO_URI,
    REFRESH_JWT_SECRET : process.env.REFRESH_JWT_SECRET,
    ACCESS_JWT_SECRET : process.env.ACCESS_JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_USER: process.env.GOOGLE_USER,
    CLIENT_URL: process.env.CLIENT_URL
}

export default config;
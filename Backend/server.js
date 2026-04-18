import app from "./src/app.js";
import connectDb from './src/config/db.js'
import config from "./src/config/config.js";

connectDb();

app.listen(config.PORT,()=>{
    console.log("server is running on port 5000");
})
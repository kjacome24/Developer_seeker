import { connect } from "mongoose";
import dotenv from "dotenv";

////THis is to be able to use the .env file
dotenv.config();

const DB = process.env.DB;

const connectDB = async () => {
    try {
        await connect(DB);
        console.log("We are ready to rock and roll, U succesfully connected to the DB! Yeahyyy!");
    }catch(error){
        console.log("G, sorry, There was an issue connecting to the DB, u gotta check for errors, or maybe u are the error lol!");
        console.log(error);
    }
}

export default connectDB;
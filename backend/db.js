import mysql from "mysql2";
import dotenv from 'dotenv';


dotenv.config();

const conn = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    port: process.env.DB_PORT
})

conn.connect((err) =>{
    if (err){
        throw err;
    }
    else{
        console.log("Connected to Database!")
    }
})

export default conn
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoute from "./routes/authRoute.js";

//configure env
dotenv.config();

//database
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', authRoute);

//rest-api
app.get('/', (req, res)=> {
    res.send('<h1>Welcome to Ecommerce App</h1>');
})

//PORT
const PORT = process.env.PORT;

//run listen
app.listen(PORT, ()=>{
    console.log(`Server is listening on PORT ${PORT}`.bgCyan.white);
})
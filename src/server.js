import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB"
// import cors from 'cors';

require('dotenv').config();

let app = express();

// app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT  || 3000;
app.listen(port, () => {
    console.log("Backend is runing on the port: " + port)
})
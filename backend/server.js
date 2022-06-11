// set up dependencies
const express = require("express");
const database_connect = require("./db/connect");
// const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./routes/authRouter");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const cookieParser = require("cookie-parser");

// set up app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

// routers
app.use("/api/", authRouter);

// set up error
app.use(notFound);
// app.use(errorHandlerMiddleware);

// set up port
const port = process.env.PORT;

// set up server
const start = async () => {
    try {
        // connect mongodb database
        await database_connect(process.env.PRO_VIEW_URI);
        app.listen(port, () =>
            console.log(`Server is listening port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();

// set up dependencies
const express = require("express");
const database_connect = require("./db/connect");
// const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./routes/authRouter");

const msgRouter = require("./routes/msgRouter");
const groupRouter = require("./routes/groupRouter");
const stockRouter = require("./routes/stockRouter");
const bot = require("./routes/bot");


const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const cookieParser = require("cookie-parser");

const http = require("http");
const cors = require("cors");

const mongoose = require("mongoose");

// set up port
const port = process.env.PORT;

// set up app
const app = express();

server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);

// routers
app.use("/api/", authRouter);
app.use("/api/", stockRouter);
app.use("/bot/", bot);

app.use("/api/", msgRouter);
app.use("/api/", groupRouter);

app.use("/api/", stockRouter);
app.use("/bot/", bot);


// set up error
app.use(notFound);
// app.use(errorHandlerMiddleware);

// set up server
const start = async () => {
    try {
        // connect mongodb database
        await database_connect(process.env.PRO_VIEW_URI);

        server.listen(port, () =>
            console.log(`Server is listening port ${port}...`)
        );

        // app.listen(port, () =>
        //     console.log(`Server is listening port ${port}...`)
        // );
    } catch (error) {
        console.log(error);
    }
};

start();

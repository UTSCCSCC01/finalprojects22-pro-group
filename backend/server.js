// set up dependencies
const express = require("express");
const database_connect = require("./db/connect");
// const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./routes/authRouter");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const cookieParser = require("cookie-parser");
const socketIO = require("socket.io");
const http = require("http");
const cors = require("cors");
const { instrument } = require("@socket.io/admin-ui");

// set up port
const port = process.env.PORT;

// set up app
const app = express();

server = http.createServer(app);

var io = socketIO(server, {
    cors: {
        origin: ["http://localhost:3000", "https://admin.socket.io"],
        credentials: true,
    },
});

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:3000", "https://admin.socket.io"],
        credentials: true,
    })
);

// routers
app.use("/api/", authRouter);

// set up error
app.use(notFound);
// app.use(errorHandlerMiddleware);

// set up server
const start = async () => {
    try {
        // connect mongodb database
        await database_connect(process.env.PRO_VIEW_URI);

        // io.on("connection", (socket) => {
        //     console.log("9");
        //     console.log(socket.id);
        // });

        instrument(io, { auth: false });

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

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("message", (value) => {
        const msg = {
            id: "blah",
            // user: "blah",
            value,
            time: Date.now(),
        };
        socket.emit("message", { msg });
    });
});

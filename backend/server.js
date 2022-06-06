// set up dependencies
const express = require("express");
const database_connect = require("./db/connect");
// const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./routes/authRouter");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// set up app
const app = express();
app.use(express.json());

// temp page
app.get('/', (req, res) => {
  res.send('<h1>Pro View</h1><a href="/api/v1/register">register</a>');
});

// routers 
app.use("/api/v1", authRouter);

// set up error
app.use(notFound);
app.use(errorHandlerMiddleware);

// set up port
const port = process.env.PORT || 5000;

// set up server
const start = async () => {
  try {
    // connect mongodb database
    await database_connect(process.env.PRO_VIEW_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

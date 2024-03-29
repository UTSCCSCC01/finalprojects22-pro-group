//Import express.js module and create its variable.
const express = require("express");
const app = express();

//Import PythonShell module.
const { PythonShell } = require("python-shell");

//Router to handle the incoming request.
app.get("/", (req, res, next) => {
  //Here are the option object in which arguments can be passed for the python_test.js.
  let options = {
    mode: "text",
    pythonOptions: ["-u"], // get print results in real-time
    args: [], //An argument which can be accessed in the script using sys.argv[1]
  };

  PythonShell.run("app.py", options, function (err, result) {
    if (err) throw err;
    // result is an array consisting of messages collected
    //during execution of script.
    console.log("result: ", result.toString());
    res.send(result.toString());
  });
});

//Creates the server on default port 8000 and can be accessed through localhost:8000
const port = 8000;
app.listen(port, () => console.log(`Server connected to ${port}`));

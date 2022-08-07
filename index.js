const express = require("express");
const logger = require("morgan"); 
const app = express();
const PORT = 4000;
const dbConfig = require("./services/dbConfig");
const router = require("./routes/index")
const cors = require("cors");
app.use(logger("dev"));
app.use(express.json({ limit: "50mb"}));
app.use(express.urlencoded({ limit: "50mb", extended: false}));
app.use("/api", router);
app.use(cors());
dbConfig();

app.listen(PORT, function(error){

    if(error){

        console.log("error in starting the server");

    }

    console.log(`server started successfully on port : ${PORT}`);

});
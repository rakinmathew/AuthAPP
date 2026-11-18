const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

//? Middleware
app.use(cors());
app.use(express.json());


//? Test API
app.get("/", (req,res) => {
    res.send("AuthApp Backend is Running Successfully");
});


//? Start Server 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server  is running on port ${PORT}`);
});


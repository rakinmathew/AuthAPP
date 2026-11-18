const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");


const app = express();

//? Middleware
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);


//? Test API
app.get("/", (req,res) => {
    res.send("AuthApp Backend is Running Successfully");
});

//? MongoDB Connection 

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB Atlas Connected Successfully");
})




//? Start Server 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server  is running on port ${PORT}`);
});


const express = require("express");
const bcrypt  = require("bcryptjs");
const User    = require("../models/User")
const jwt     = require("jsonwebtoken");

const router = express.Router();

//? Signup Api
router.post("/signup", async (req,res) =>{

    try{
        const {name, email,password } = req.body;

//! Check all fields
if (!name || !email || !password){
    return res.status(400).json({
        message: "All fields are required",
    });
}

//? Check Existing user
const existingUser = await User.findOne({ email });

if (existingUser){
    return res.status(400).json({
        message: "Email already registered",
    });
}

// Hashed Password

const hashedPasword = await bcrypt.hash(password, 10);

// Create new user

const newUser = new User({
    name,
    email,
    password: hashedPasword,
});

await newUser.save();

res.status(201).json({
    message: "Registration Successful",
});



    } catch(error) {
       console.log("Signup Error:", error);
       
       res.status(500).json({
        message: "Server error",
       });
    }


}
);



//! Login API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //? Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    //? Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    //? Compare password with hashed password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    //? Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});



module.exports = router;
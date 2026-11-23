
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  //? Password visibility states
    const [showPassword, setShowPassword] = useState(false);
  

 const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
       "https://authapp-cp9y.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      //? Save JWT token
      localStorage.setItem("token", response.data.token);

//? Redirect to dashboard
navigate("/dashboard");


      setMessage("Login Successful!");
      console.log(response.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Welcome Back!
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Sign in to your account
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          <label className="block font-bold text-gray-800 mb-2">
  Email
</label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            required
          />

{/* 
<div className="relative">
  <label className="block font-bold text-gray-800 mb-2">
  Password
</label>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full rounded-lg border p-3 pr-12 outline-none focus:border-blue-500"
    required
  />

   <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-500 hover:text-gray-800"
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
</div> */}

<div>
  <label className="mb-2 block font-bold text-gray-800">
    Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full rounded-lg border p-3 pr-12 outline-none focus:border-blue-500"
      required
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2"
    >
      {showPassword ? (
        <EyeOff className="h-5 w-5 text-gray-500" />
      ) : (
        <Eye className="h-5 w-5 text-gray-500" />
      )}
    </button>
  </div>
</div>

          {message && (
            <p className="text-center text-sm text-blue-600">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/" className="font-semibold text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;

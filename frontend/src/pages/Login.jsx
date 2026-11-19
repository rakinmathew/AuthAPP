
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
          Welcome Back
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Sign in to your account
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            required
          />

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

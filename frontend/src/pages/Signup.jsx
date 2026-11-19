
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  //? Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //? UI states
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //? Signup function
  const handleSignup = async (e) => {
    e.preventDefault();

    setMessage("");

    // Check empty fields
    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please fill all fields!");
      return;
    }

    // Check password match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      // Send data to backend
      const response = await axios.post(
        "https://authapp-cp9y.onrender.com/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      setMessage(response.data.message);

      // Clear form after successful signup
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (error) {
  console.error("Signup error:", error);

  setMessage(
    error.response?.data?.message ||
    error.message ||
    "Signup failed!"
  );
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Create Account
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Sign up to get started
        </p>

        <form onSubmit={handleSignup} className="space-y-4">

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            required
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            required
          />

          {/* Success / Error Message */}
          {message && (
            <p className="text-center text-sm text-blue-600">
              {message}
            </p>
          )}

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

        </form>

        {/* Login Link */}
        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"

const Signup = () => {
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // UI states
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


const navigate = useNavigate();


  // Signup function
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
      // setName("");
      // setEmail("");
      // setPassword("");
      // setConfirmPassword("");

      navigate("/login");

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

<label className="block font-bold text-gray-800 mb-2">
  Full Name
</label>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500 "
            required
          />

          {/* Email */}

          <label className="block font-bold text-gray-800 mb-2">
  Email Address
</label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            required
          />

          {/* Password */}

          <label className="block font-bold text-gray-800 mb-2">
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20}/> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}

          <label className="block font-bold text-gray-800 mb-2">
  Confirm Password
</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border p-3 pr-12 outline-none focus:border-blue-500"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20} />}
            </button>
          </div>

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
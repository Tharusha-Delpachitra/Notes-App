import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!username) {
      setError("Please enter the username.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");

    if (!password) {
      setError("Please enter the password.");
      return;
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/create-account", {
        username,
        email,
        password,
      });

      if (response.data.error) {
        setError(response.data.message);
      } else {
        // After successful signup, redirect to login page
        window.location.href = "/login"; // Redirect to login page
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <form
          onSubmit={handleSignUp}
          className="border-2 h-[480px] w-[300px] md:w-[400px] flex flex-col justify-center p-4 gap-8 rounded-lg shadow-lg"
        >
          <h1 className="text-3xl font-semibold text-center">Sign Up</h1>

          <input
            type="text"
            placeholder="username"
            className="border p-2 px-4 rounded w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="text"
            placeholder="Email"
            className="border p-2 px-4 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 px-4 rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-600 text-sm pb-1">{error}</p>}

          <button
            type="submit"
            className="bg-blue-500 py-2 px-6 rounded text-white font-semibold w-full"
          >
            Sign up
          </button>

          <p className="text-xs sm:text-base text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;

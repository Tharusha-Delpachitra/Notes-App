import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
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

    setError("");

    //Login API call
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <form
          onSubmit={handleLogin}
          className="border-2 h-[400px] w-[300px] md:w-[400px] flex flex-col justify-center p-4 gap-10 rounded-lg shadow-lg"
        >
          <h1 className="text-3xl font-semibold text-center">Login</h1>

          <input
            type="text"
            placeholder="Email"
            className="border p-1 px-4 rounded w-full outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-600 text-xs pb-1">{error}</p>}

          <button
            type="submit"
            className="bg-blue-500 py-2 px-6 rounded text-white font-semibold w-full"
          >
            Login
          </button>

          <p className="text-xs sm:text-base">
            Not registered yet?{" "}
            <Link to="/signup" className="text-blue-500 underline">
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;

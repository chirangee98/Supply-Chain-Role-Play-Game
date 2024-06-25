import React, { useState, useEffect } from "react";
import Header from "./Header";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useUser } from "../assets/Context/userContext";

const Login = () => {
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Use useNavigate instead of history
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const { setUser, setIsLoggedIn } = useUser();

  useEffect(() => {
    // Clear userId from local storage on component load
    // alert("chala")
    localStorage.removeItem("userid");
    localStorage.removeItem("usertype");
  }, []); // Empty dependency array ensures it runs only once

  async function handleLogin(e) {
    e.preventDefault();
    // console.log(userType);
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
        userType,
      });

    if(response.data.msg ){ 
        alert(response.data.msg);
        // navigate("/"); 
      }else{
        // console.log(response);
        localStorage.setItem('userid', response.data);
        localStorage.setItem('usertype', userType);
          navigate("/home"); // Navigate to home page
      }   
    } catch (error) {
      alert(error);
    }
  }

  // const handleForgotPassword = () => {
  //   // Implement forgot password logic here
  //   console.log("Forgot password...");
  // };

  return (
    <div className=" bg-gray-100">
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white shadow-md rounded px-16 py-6">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="userType"
              >
                User Type
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="user">Customer</option>
                <option value="retailer">Retailer</option>
                <option value="wholesaler">Wholesaler</option>
                <option value="distributor">Distributor</option>
                <option value="manufacturer">Manufacturer</option>
                <option value="admin">Admin</option>
                <option value="SuperAdmin">Super Admin</option>
              </select>
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              {/* <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </a> */}
            </div>
          </form>
          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <NavLink
                to="/SignUp"
                className="text-blue-500 hover:text-blue-800"
              >
                Sign Up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

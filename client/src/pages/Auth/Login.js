import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message, {
          duration: 6000, // Duration the toast is visible (in milliseconds)
          style: {
            animation: "slideDown 1s ease-in-out", // Custom transition time
          },
        });
        navigate("/");
      } else {
        toast.error(res.data.message, {
          duration: 4000, // Duration the toast is visible (in milliseconds)
          style: {
            animation: "slideDown 1s ease-in-out", // Custom transition time
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!!", {
        duration: 4000, // Duration the toast is visible (in milliseconds)
        style: {
          animation: "slideDown 1s ease-in-out", // Custom transition time
        },
      });
    }
  };

  return (
    <Layout>
      <div className="login">
        <h1>Login </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail " className="form-label">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="form-control"
              id="exampleInputEmail"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Tick-Tock
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;

import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/forgot-password`, {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message, {
          duration: 4000, // Duration the toast is visible (in milliseconds)
          style: {
            animation: "slideDown 1s ease-in-out", // Custom transition time
          },
        });
        navigate("/login");
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
    <Layout title={"Forgot Password - Wristly "}>
      <div className="login">
        <h1>Reset Password</h1>
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
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail " className="form-label">
              Answer
            </label>
            <input
              type="text"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              className="form-control"
              id="exampleInputAnswer"
              placeholder="Enter your secret answer here"
              required
            />
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              RESET
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;

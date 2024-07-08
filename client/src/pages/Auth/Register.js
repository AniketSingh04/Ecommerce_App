import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message, {
          duration: 6000, // Duration the toast is visible (in milliseconds)
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
    <Layout title="Sign Up - Wristly">
      <div className="register">
        <h1>Sign Up </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName " className="form-label">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="form-control"
              id="exampleInputName"
              required
            />
          </div>

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

          <div className="mb-3">
            <label htmlFor="exampleInputName " className="form-label">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="form-control"
              id="exampleInputName"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputName " className="form-label">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="form-control"
              id="exampleInputName"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;

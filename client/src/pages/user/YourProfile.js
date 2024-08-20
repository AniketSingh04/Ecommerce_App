import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layouts/UserMenu";
import Layout from "../../components/Layouts/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const YourProfile = () => {
  //context
  const [auth, setAuth] = useAuth();

  //states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    const { name, email, address, phone } = auth.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/auth/profile`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully", {
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
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="register">
              <h1>USER PROFILE</h1>
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
                    disabled
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
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default YourProfile;

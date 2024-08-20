import React from "react";
import Layout from "../components/Layouts/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            <div className="row">
              {cart?.map((p) => (
                <div className="row mb-2 p-3 card flex-row">
                  <div className="col-md-4">
                    {" "}
                    <img
                      className="card-img-top"
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      width="95px"
                      height={"100px"}
                    />
                  </div>
                  <div className="col-md-8">
                    <p style={{ fontFamily: "Roboto, sans-serif" }}>{p.name}</p>
                    <p style={{ fontFamily: "Roboto, sans-serif" }}>
                      {p.description.substring(0, 30)}
                    </p>
                    <p style={{ fontFamily: "Roboto, sans-serif" }}>
                      Price: {p.price}
                    </p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4 text-center">
            <h2 style={{ fontFamily: "Roboto, sans-serif" }}>Cart Summary</h2>
            <p style={{ fontFamily: "Roboto, sans-serif" }}>
              Total | Checkout | Payment
            </p>
            <hr />
            <h4 style={{ fontFamily: "Roboto, sans-serif" }}>
              Total : {totalPrice()}
            </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4 style={{ fontFamily: "Roboto, sans-serif" }}>
                    Current Address
                  </h4>
                  <h5 style={{ fontFamily: "Roboto, sans-serif" }}>
                    {auth?.user?.address}
                  </h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
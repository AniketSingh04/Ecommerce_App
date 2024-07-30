import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get Products
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            className="card-img-top product-image"
            src={`/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            height="300"
            width={"300px"}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center product-details-title">Product Details</h1>
          <h5 className="detail">Name: {product.name}</h5>
          <h5 className="detail">Description: {product.description}</h5>
          <h5 className="detail">Price: {product.price}</h5>
          <h5 className="detail">
            Category: {product.category ? product.category.name : "N/A"}
          </h5>
          <h5 className="detail">Quantity: {product.quantity}</h5>
          <button className="btn btn-add-to-cart ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h5>Similar Products</h5>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products Found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2 product-card" style={{ width: "18rem" }}>
              <img
                className="card-img-top product-image"
                src={`/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 40)}</p>
                <p className="card-text">₹{p.price}</p>
                <button className="btn btn-add-to-cart ms-1">
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

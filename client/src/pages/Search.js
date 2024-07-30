import Layout from "../components/Layouts/Layout";
import React from "react";
import { useSearch } from "../context/search";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={`Search Results`}>
      <div className="container">
        <div className="text-center mt-3">
          <h1
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: "bold",
              fontSize: "2rem",
              color: "#333",
            }}
          >
            Search Results
          </h1>
          <h6
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {values?.results.length < 1
              ? "No Products found"
              : `Found ${values?.results.length} Products`}
          </h6>
          <div className="d-flex flex-wrap mt-4 . ">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  className="card-img-top"
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 40)}</p>
                  <p className="card-text">₹{p.price}</p>
                  <button className="btn btn-primary">More Details</button>
                  <button className="btn btn-secondary ms-1">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;

import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layouts/Layout";

const PageNotFound = () => {
  return (
    <Layout title={"Go Back - PNF"}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;

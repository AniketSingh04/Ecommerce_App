import React from "react";
import Layout from "../components/Layouts/Layout";

const Policy = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>Voluntarily Information Collection</p>
          <p>Industry-Standard Security</p>
          <p>No Third-Party Disclosure</p>
          <p>Cookies to enhance Browsing experience</p>
          <p>Reserve the right to update this Privacy Policy</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;

import React from "react";
import Layout from "../components/Layouts/Layout";

const About = () => {
  return (
    <Layout title={"About Us - Wristly"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            At Wristly, we believe in the timeless elegance of precision-crafted
            timepieces. Our passion for watches drives us to curate a collection
            that blends craftsmanship with style, offering a diverse range to
            suit every occasion. Whether you seek classic sophistication or
            modern innovation, Wristly brings you the finest selection of
            watches, meticulously chosen to elevate your everyday style. Explore
            our exclusive brands and discover the perfect companion that
            reflects your distinct personality and enduring taste.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;

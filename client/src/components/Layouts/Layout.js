import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, author, keywords }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "72vh" }}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              animation: "slideDown 1s ease-in-out", // Custom transition time
            },
          }}
          containerStyle={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Wristly",
  description: "mern stack application",
  keywords: "mern, react, node, mongodb, helmet, routers, watches, wristly",
  author: "AniketSingh04",
};
export default Layout;

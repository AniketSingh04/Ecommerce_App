# Customized Ecommerce Website

This project is a fully functional e-commerce website, built with a focus on security, performance, and user experience. The website includes features for secure user authentication, SEO optimization, efficient data management, and seamless payment processing.

## Features

- **JWT Authentication**: Implemented JSON Web Tokens (JWT) for secure user authentication and authorization, ensuring that user data is protected at all times.

- **SEO Optimization**: Enhanced search engine visibility by optimizing the website with meta tags, canonical tags, and structured data. This helps improve the site's ranking on search engines and drives more traffic.

- **Pagination**: Developed a robust pagination system to enhance user experience by efficiently handling large product datasets. This ensures that users can easily navigate through the product catalog without performance issues.

- **Database Management**: Managed product, user, and order data using MongoDB Atlas, a cloud-based NoSQL database, providing scalability and flexibility in handling large volumes of data.

- **Payment Gateway Integration**: Integrated Braintree-PayPal for secure payment processing, supporting card payments. This ensures a smooth and secure transaction process for users.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JSON Web Tokens (JWT)
- **Payment Gateway**: Braintree-PayPal
- **SEO Tools**: Meta tags, Canonical tags, Structured data

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/Aniketsingh04/Ecommerce_App.git
   ```

2. Install dependencies:

   ```bash
   cd Ecommerce_App
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```env
     MONGO_URI=your-mongodb-atlas-connection-string
     JWT_SECRET=your-jwt-secret
     BRAINTREE_MERCHANT_ID=your-braintree-merchant-id
     BRAINTREE_PUBLIC_KEY=your-braintree-public-key
     BRAINTREE_PRIVATE_KEY=your-braintree-private-key
     ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Access the website:
   - Open your browser and go to `http://localhost:3000`.

## Usage

- **User Authentication**: Users can register and log in securely using JWT authentication.
- **Product Browsing**: Users can browse products with a paginated view for an improved experience.
- **Order Management**: Users can add products to their cart and proceed to checkout using Braintree-PayPal for payments.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

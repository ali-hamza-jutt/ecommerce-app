Welcome to the E-commerce project repository! This project is designed to showcase a complete e-commerce application with features such as navigation, category selection, product listing, product details, cart management, multi-step checkout, order management, and user authentication.

Production link: https://ecommerce-app-rho-puce.vercel.app/

Features

Navigation
Navbar: Allows users to navigate through different sections of the application, including login/sign-up, orders, cart, and product categories.

Category Bar
Category Selection: Clicking on categories fetches data from an API specific to that category, dynamically rendering product listings.

Product Listing
Product Cards: Display product information fetched from the API, providing a snapshot view of each product.

Product Description
Detailed Product View: Shows additional details about a selected product, allowing users to make informed decisions before adding to cart.

Cart Management
Add to Cart: Enables users to select quantity and color options for products, which are then added to the cart.
View Cart: Displays all items in the cart, with options to adjust quantities or remove items.
Checkout Button: Initiates the checkout process for placing orders.


Multi-step Checkout
Step 1: Review Cart: Displays a summary of items in the cart for review.
Step 2: Shipping: Collects shipping details from the user.
Step 3: Payment Method: Allows users to add a payment method securely.
Step 4: Review Order: Provides a final overview of the order before placing it.


Order Management
Order History: Shows a comprehensive list of all past orders, including order date, time, item details, and shipping information.


Authentication
Firebase Authentication: Handles user login and sign-up securely using Firebase Authentication services.

Forms
Formik and Yup: Implements forms across the application for login, sign-up, shipping details, and payment methods, ensuring validation and user-friendly input handling.

Technologies Used
React: Frontend framework for building user interfaces.
React Router DOM: Manages navigation within the single-page application.
Firebase: Backend services for authentication, database (Realtime Database for cart and orders), and hosting.
Formik: Library for building forms with React, simplifying form management and validation.
Yup: JavaScript schema builder for value parsing and validation.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

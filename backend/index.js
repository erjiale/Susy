const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;

// USERS routes
const registerRoute = require("./routes/users/registerRoute");
const loginRoute = require("./routes/users/loginRoute");
const deleteUserRoute = require("./routes/users/deleteUserRoute");
// VERIFY EMAIL routes
const verifyEmailRoute = require("./routes/verifyEmail/verifyEmailRoute");
// PRODUCTS routes
const addProductRoute = require("./routes/products/addProduct");
const getAllProductsRoute = require("./routes/products/getAllProducts");
const removeProductRoute = require("./routes/products/removeProduct");
// SHOPPING CART routes
const getCartRoute = require("./routes/shoppingCart/getCart");
const addProductToCartRoute = require("./routes/shoppingCart/addOneProductCart");
const removeOneQuantityFromCartRoute = require("./routes/shoppingCart/removeOneQuantityCart");
const removeProductFromCartRoute = require("./routes/shoppingCart/removeProductCart");

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes --> USERS
app.use("/api/register", registerRoute); // REGISTER
app.use("/api/login", loginRoute); // LOGIN
app.use("/api/user", deleteUserRoute); // DELETE user
// Routes --> VERIFY EMAIL
app.use("/api/verify", verifyEmailRoute); // VERIFY Email account
// Routes --> PRODUCTS
app.use("/api/product", addProductRoute); // CREATE product
app.use("/api/product", getAllProductsRoute); // GET ALL products
app.use("/api/product", removeProductRoute); // DELETE product
// Routes --> SHOPPING CART
app.use("/api/cart", getCartRoute); // GET own Shopping CART
app.use("/api/cart", addProductToCartRoute); // ADD product to own Shopping CART
app.use("/api/cart", removeOneQuantityFromCartRoute); // DELETE one quantity of a product from Shopping CART
app.use("/api/cart", removeProductFromCartRoute); // DELETE a product from Shopping CART

// app.get("/api/uploads/:imgName", (req, res) => {
//   return res.send("ALOHA");
// });

app.get("*", (req, res) => {
  res.send("Susy's Backend");
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});

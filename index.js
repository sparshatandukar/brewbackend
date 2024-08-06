const express = require("express");
require('dotenv').config();
const connectDB = require("./src/Config/db");

const recipeRoute = require("./src/Routes/recipeRoutes");
const ingredientRoute = require("./src/Routes/ingredientRoutes");
const ratingRoute = require("./src/Routes/ratingRoutes");
const contactRoute = require("./src/Routes/contactRoutes");
const profileRoutes = require("./src/Routes/ProfileRoutes");
const authRoutes = require("./src/Routes/authRoutes");
const categoryRoutes = require('./src/Routes/categoryRoutes');
const tagRoutes = require('./src/Routes/tagRoutes');

const app = express();
const cors = require('cors');
const port = process.env.port;
connectDB();

app.use(express.json());
app.use(cors());

 // Use PORT from environment variable or fallback to 3000

// Register routes
app.use('/api/recipe', recipeRoute);
app.use('/api/auth', authRoutes);
app.use('/api/ingredient', ingredientRoute);
app.use('/api/rating', ratingRoute);
app.use('/api/contact', contactRoute);
app.use('/api/tag', tagRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/category', categoryRoutes);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(__dirname + "/uploads"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

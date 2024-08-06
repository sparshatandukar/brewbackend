const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const authorizeRole = require("../Middleware/authorizationMiddleware");
const recipeController = require("../Controllers/recipeControllers");

/**
 * @description To get all categories
 * @api /api/category/create
 * @access PUBLIC
 * @type POST
 * @return response
 */

router.post("/create", auth, authorizeRole('admin'), recipeController.addRecipe);
router.put("/update/:id", auth, authorizeRole('admin'), recipeController.updateRecipe);
router.get("/all", auth, authorizeRole('admin'), recipeController.getRecipes);
router.get("/:id", auth, authorizeRole('admin'), recipeController.getRecipe);

module.exports = router;
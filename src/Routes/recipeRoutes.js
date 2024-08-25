const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const authorizeRole = require("../Middleware/authorizationMiddleware");
const recipeController = require("../Controllers/recipeControllers");
const { recipeImage } = require('../Middleware/uploadMiddleware');
/**
 * @description To add a new recipe
 * @api /api/recipe/create
 * @access PRIVATE (Admin only)
 * @type POST
 * @return response
 */
router.post("/create", auth, authorizeRole('admin'),recipeImage.single('recipeImage'), recipeController.addRecipe);

/**
 * @description To update an existing recipe
 * @api /api/recipe/update/:id
 * @access PRIVATE (Admin only)
 * @type PUT
 * @return response
 */
router.patch("/update/:id", auth, authorizeRole('admin'),recipeImage.single('recipeImage'),  recipeController.updateRecipe);

/**
 * @description To get all recipes
 * @api /api/recipe/all
 * @access PRIVATE (Admin only)
 * @type GET
 * @return response
 */
router.get("/all", auth, authorizeRole('admin'), recipeController.getRecipes);

/**
 * @description To get a single recipe by ID
 * @api /api/recipe/:id
 * @access PRIVATE (Admin only)
 * @type GET
 * @return response
 */
router.get("/:id", auth, recipeController.getRecipe);

/**
 * @description To delete all recipes
 * @api /api/recipe/delete
 * @access PRIVATE (Admin only)
 * @type GET
 * @return response
 */
router.delete("/delete", auth, authorizeRole('admin'), recipeController.deleteAllRecipes);

/**
 * @description To delete a single recipe by ID
 * @api /api/recipe/delete/:id
 * @access PRIVATE (Admin only)
 * @type GET
 * @return response
 */
router.delete("/delete/:id", auth, authorizeRole('admin'), recipeController.deleteRecipe);

module.exports = router;

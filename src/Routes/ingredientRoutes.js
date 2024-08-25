const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const authorizeRole = require("../Middleware/authorizationMiddleware");
const ingredientController = require("../Controllers/ingredientController");

/**
 * @description To get all categories
 * @api /api/category/create
 * @access PUBLIC
 * @type POST
 * @return response
 */

router.post("/create", auth, authorizeRole('admin'), ingredientController.addIngredient);
router.patch("/update/:id", auth, authorizeRole('admin'), ingredientController.updateIngredient);
router.get("/all", auth, authorizeRole('admin'), ingredientController.getIngredients);
router.get("/:id", auth, ingredientController.getIngredient);
router.delete("/delete/:id", auth, authorizeRole('admin'), ingredientController.deleteIngredient);

module.exports = router;
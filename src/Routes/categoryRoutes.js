const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const authorizeRole = require("../Middleware/authorizationMiddleware");
const categoryController = require("../Controllers/categoryControllers");

/**
 * @description To get all categories
 * @api /api/category/create
 * @access PUBLIC
 * @type POST
 * @return response
 */

router.post("/create", auth, authorizeRole('admin'), categoryController.addCategory);
router.patch("/update/:id", auth, authorizeRole('admin'), categoryController.updateCategory);
router.get("/all", auth, authorizeRole('admin'), categoryController.getCategories);
router.get("/:id", auth, authorizeRole('admin'), categoryController.getCategory);
router.delete("/delete/:id", auth, authorizeRole('admin'), categoryController.deleteCategory);

module.exports = router;
const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const authorizeRole = require("../Middleware/authorizationMiddleware");
const tagController = require("../Controllers/tagController");

/**
 * @description To get all categories
 * @api /api/category/create
 * @access PUBLIC
 * @type POST
 * @return response
 */

router.post("/create", auth, authorizeRole('admin'), tagController.addTag);
router.put("/update/:id", auth, authorizeRole('admin'), tagController.updateTag);
router.get("/all", auth, authorizeRole('admin'), tagController.getTags);
router.get("/:id", auth, authorizeRole('admin'), tagController.getTag);

module.exports = router;
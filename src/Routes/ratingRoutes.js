const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const authorizeRole = require("../Middleware/authorizationMiddleware");
const ratingController = require("../Controllers/ratingController");

/**
 * @description To get all categories
 * @api /api/category/create
 * @access PUBLIC
 * @type POST
 * @return response
 */

router.post("/create", auth, authorizeRole('admin'), ratingController.addRating);
router.put("/update/:id", auth, authorizeRole('admin'), ratingController.updateRating);
router.get("/all", auth, authorizeRole('admin'), ratingController.getRatings);
router.get("/:id", auth, authorizeRole('admin'), ratingController.getRating);

module.exports = router;
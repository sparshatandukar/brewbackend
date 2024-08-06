const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const authorizeRole = require("../Middleware/authorizationMiddleware");
const contactController = require("../Controllers/contactController");

/**
 * @description To get all categories
 * @api /api/category/create
 * @access PUBLIC
 * @type POST
 * @return response
 */

router.post("/create", auth, authorizeRole('admin'), contactController.addContact);
router.put("/update/:id", auth, authorizeRole('admin'), contactController.updateContact);
router.get("/all", auth, authorizeRole('admin'), contactController.getContacts);
router.get("/:id", auth, authorizeRole('admin'), contactController.getContact);

module.exports = router;
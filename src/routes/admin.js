const express = require("express");
const router = express.Router();
const adminController = require("../app/controllers/AdminController");
const { requireAuth } = require("../middleware/authMiddleware");
const { requireAuth1 } = require("../middleware/authMiddleware1");
const { isAdmin } = require("../middleware/isAdmin");

router.get("/signup", adminController.signup);
router.post("/signup", adminController.post_signup);
router.get("/login", adminController.login);
router.post("/login", adminController.post_login);
router.get("/logged", requireAuth1, isAdmin, adminController.logged);
router.get("/logout", requireAuth1, isAdmin, adminController.logout);

router.post("/create", requireAuth1, isAdmin, adminController.post_create);
router.get("/create", requireAuth1, isAdmin, adminController.create);
router.get("/list", requireAuth1, isAdmin, adminController.list);
router.get("/:id/edit", requireAuth1, isAdmin, adminController.edit);
router.put("/:id", requireAuth1, isAdmin, adminController.put_edit);
//delete

router.put("/order/:id", requireAuth1, isAdmin, adminController.update);
router.post("/delete", requireAuth1, isAdmin, adminController.delete);
router.get("/order", requireAuth1, isAdmin, adminController.order);
router.get("/", adminController.index);

module.exports = router;

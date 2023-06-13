var express = require("express")
var router = express.Router()
const userController = require("../controller/userController")
const adminController = require("../controller/adminController")


// User GET
router.get("/", userController.user_login)
router.get("/user_signup", userController.user_signup)
router.get("/user_success", userController.user_success)

// User POST
router.post("/user_login", userController.user_login_post)
router.post("/user_signup", userController.user_signup_post)
router.post("/user_logout", userController.user_logout_post)


// Admin GET
router.get("/dashboard", adminController.dashboard)
router.get("/admin_login", adminController.admin_login)
router.get("/user_details", adminController.user_details)
router.get("/update_user_details", adminController.update_user)
router.get("/delete_user", adminController.delete_user)

// Admin POST
router.post("/admin_login", adminController.admin_login_post)
router.post("/update_user", adminController.update_user_post)
router.post("/admin_logout", adminController.admin_logout_post)


module.exports = router
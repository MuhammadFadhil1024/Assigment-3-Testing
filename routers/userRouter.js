const router = require("express").Router()
const UserController = require('../controllers/userControllers')

router.get("/", UserController.getAllUsers)
router.post("/register", UserController.register)
router.post("/login", UserController.login)

module.exports = router
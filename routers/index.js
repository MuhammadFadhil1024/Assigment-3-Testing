const router = require("express").Router()
const authentication = require("../middleware/authentication")
const PhotoRouters = require("./photoRouter")
const UserRouters = require("./userRouter")

router.use("/users", UserRouters)

router.use(authentication)

router.use("/photos", PhotoRouters)

module.exports = router
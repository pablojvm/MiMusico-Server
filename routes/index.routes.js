const router = require("express").Router();

const adRouter = require("./ad.routes")
router.use("/ad", adRouter)

const reviewRouter = require("./review.routes")
router.use("/review", reviewRouter)

const userRoutes = require(("./user.routes"))
router.use("/user", userRoutes)

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)



module.exports = router;

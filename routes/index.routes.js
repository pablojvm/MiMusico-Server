const router = require("express").Router();

const anuncioRouter = require("./anuncio.routes")
router.use("/anuncio", anuncioRouter)

const reseñaRouter = require("./reseña.routes")
router.use("/reseña", reseñaRouter)

const userRoutes = require(("./user.routes"))
router.use("/user", userRoutes)

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)



module.exports = router;

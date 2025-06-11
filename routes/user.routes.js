const router = require("express").Router();

const User = require("../models/User.model")
const verifyToken = require("../middlewares/auth.middlewares")

router.get("/profile", verifyToken, async(req, res, next) => {
  try {
    const response = await User.findById(req.payload._id)
    res.json(response)
  } catch (error) {
    next(error)
  }
});

router.patch("/profile",verifyToken, async(req, res, next) =>{
  try {
    const response = await User.findByIdAndUpdate(req.payload._id, {
     username: req.body.username,
     email: req.body.email,
     photo: req.body.photo,
     constactNumber: req.body.constactNumber
    })
    res.json(response).send("Perfil actualizado")
  } catch (error) {
    next(error)
  }
})

// router.patch("/user-profile",verifyToken, async(req, res, next) =>{
//   try {
//     const response = await Ad.findByIdAndUpdate(req.payload._id, {
//      password: 
//     })
//     res.json(response).send("Perfil actualizado")
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router
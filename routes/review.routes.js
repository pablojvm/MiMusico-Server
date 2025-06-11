const router = require("express").Router();

const Review = require("../models/Review.model")

router.post(("/"), async(req, res,next) => {
  try {
    const response = await Review.create({
      title: req.body.title,
      text: req.body.text,
      score: req.body.score,
      creator: req.body.creator,
      ad: req.body.ad
    })
    res.json(response)
  } catch (error) {
    next(error)
  }
})

router.patch("/:reviewId", async(req, res, next) =>{
  try {
    const response = await Review.findByIdAndUpdate(req.params.reviewId, {
      title: req.body.title,
      text: req.body.text,
      score: req.body.score
    })
    res.json(response).send("Reseña actualizada")
  } catch (error) {
    next(error)
  }
})

router.delete("/:reviewId", async (req, res, next) => {
  try {
    await Review.findByIdAndDelete(req.params.reviewId)
    res.send("Reseña borrada")
  } catch (error) {
    next(error)
  }
})


module.exports = router
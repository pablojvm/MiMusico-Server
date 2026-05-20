const router = require("express").Router();
const mongoose = require("mongoose");

const Review = require("../models/Review.model");
const verifyToken = require("../middlewares/auth.middlewares");

router.post("/", verifyToken, async (req, res, next) => {
  try {
    const response = await Review.create({
      title: req.body.title,
      text: req.body.text,
      score: req.body.score,
      creator: req.payload._id,
      ad: req.body.ad,
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

router.patch("/:reviewId", verifyToken, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.reviewId)) {
      return res.status(400).json({ errorMessage: "ID de reseña no válido" });
    }
    const response = await Review.findByIdAndUpdate(
      req.params.reviewId,
      {
        title: req.body.title,
        text: req.body.text,
        score: req.body.score,
      },
      { new: true }
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.delete("/:reviewId", verifyToken, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.reviewId)) {
      return res.status(400).json({ errorMessage: "ID de reseña no válido" });
    }
    await Review.findByIdAndDelete(req.params.reviewId);
    res.json({ message: "Reseña borrada" });
  } catch (error) {
    next(error);
  }
});

router.get("/own", verifyToken, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const response = await Review.find({ creator: userId }).populate(
      "ad",
      "title"
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:adId", async (req, res, next) => {
  try {
    const { adId } = req.params;
    if (!mongoose.isValidObjectId(adId)) {
      return res.status(400).json({ errorMessage: "ID de anuncio no válido" });
    }
    const response = await Review.find({ ad: adId }).populate("creator");
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

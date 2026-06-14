const router = require("express").Router();
const mongoose = require("mongoose");

const Ad = require("../models/Ad.model");
const verifyToken = require("../middlewares/auth.middlewares");
const { verifyAdOwner } = require("../middlewares/ownership.middlewares");

router.get("/instruments", async (req, res, next) => {
  try {
    const response = await Ad.find({ type: "instrument" }).populate("owner");
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/groups", async (req, res, next) => {
  try {
    const response = await Ad.find({ type: "service" }).populate("owner");
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/own", verifyToken, async (req, res, next) => {
  const objectId = req.query.objectId || req.payload._id;
  try {
    const response = await Ad.find({ owner: objectId });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:adId", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.adId)) {
      return res.status(400).json({ errorMessage: "ID de anuncio no válido" });
    }
    const response = await Ad.findById(req.params.adId).populate("owner");
    if (!response) {
      return res.status(404).json({ errorMessage: "Anuncio no encontrado" });
    }
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/", verifyToken, async (req, res, next) => {
  try {
    const response = await Ad.create({
      type: req.body.type,
      family: req.body.family,
      brand: req.body.brand,
      title: req.body.title,
      model: req.body.model,
      cost: req.body.cost,
      state: req.body.state,
      owner: req.payload._id,
      photos: req.body.photos,
      description: req.body.description,
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

router.patch("/:adId", verifyToken, verifyAdOwner, async (req, res, next) => {
  try {
    const response = await Ad.findByIdAndUpdate(
      req.params.adId,
      {
        brand: req.body.brand,
        title: req.body.title,
        model: req.body.model,
        cost: req.body.cost,
        state: req.body.state,
        family: req.body.family,
        photos: req.body.photos,
        description: req.body.description,
      },
      { new: true }
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.delete("/:adId", verifyToken, verifyAdOwner, async (req, res, next) => {
  try {
    await Ad.findByIdAndDelete(req.params.adId);
    res.json({ message: "Anuncio borrado" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

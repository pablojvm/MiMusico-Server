const mongoose = require("mongoose");
const Ad = require("../models/Ad.model");
const Review = require("../models/Review.model");

/**
 * Verifica que el usuario autenticado sea el dueño del anuncio identificado
 * por `req.params.adId`. Requiere haber pasado antes por `verifyToken`.
 */
async function verifyAdOwner(req, res, next) {
  try {
    const { adId } = req.params;
    if (!mongoose.isValidObjectId(adId)) {
      return res.status(400).json({ errorMessage: "ID de anuncio no válido" });
    }
    const ad = await Ad.findById(adId).select("owner");
    if (!ad) {
      return res.status(404).json({ errorMessage: "Anuncio no encontrado" });
    }
    if (ad.owner.toString() !== req.payload._id) {
      return res
        .status(403)
        .json({ errorMessage: "No tienes permiso para modificar este anuncio" });
    }
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Verifica que el usuario autenticado sea el creador de la reseña identificada
 * por `req.params.reviewId`. Requiere haber pasado antes por `verifyToken`.
 */
async function verifyReviewOwner(req, res, next) {
  try {
    const { reviewId } = req.params;
    if (!mongoose.isValidObjectId(reviewId)) {
      return res.status(400).json({ errorMessage: "ID de reseña no válido" });
    }
    const review = await Review.findById(reviewId).select("creator");
    if (!review) {
      return res.status(404).json({ errorMessage: "Reseña no encontrada" });
    }
    if (review.creator.toString() !== req.payload._id) {
      return res
        .status(403)
        .json({ errorMessage: "No tienes permiso para modificar esta reseña" });
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { verifyAdOwner, verifyReviewOwner };

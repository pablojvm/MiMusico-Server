const router = require("express").Router();

const Ad = require("../models/Ad.model");

router.get("/instruments", async(req, res,next) => {
  try {
    const response = await Ad.find({type:'instrument'})
    .populate("owner")
    res.json(response)
  } catch (error) {
    next(error)
  }
});

router.get("/groups", async(req, res,next) => {
  try {
    const response = await Ad.find({type:'service'})
    .populate("owner")
    res.json(response)
  } catch (error) {
    next(error)
  }
});

router.get("/own", async(req, res,next) => {
   const objectId  = req.query.objectId
  try {
    const response = await Ad.find({owner:objectId})
    res.json(response)
  } catch (error) {
    next(error)
  }
});

router.get("/:adId", async(req, res,next) => {
 
  try {
    console.log(req.params)
    const response = await Ad.findById(req.params.adId)
    .populate("owner")
    res.json(response)
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const response = await Ad.create({
      type: req.body.type,
      family: req.body.family,
      brand: req.body.brand,
      name: req.body.name,
      model: req.body.model,
      cost: req.body.cost,
      state: req.body.state,
      owner: req.body.owner,
      photos: req.body.photos
    });
    res.json(response).send("Anuncio creado con exito");
  } catch (error) {
    next(error);
  }
});

router.patch("/:adId", async(req, res, next) =>{
  try {
    const response = await Ad.findByIdAndUpdate(req.params.adId, {
      brand: req.body.brand,
      name: req.body.name,
      model: req.body.model,
      cost: req.body.cost,
      state: req.body.state
    })
    res.json(response).send("Anuncio actualizado")
  } catch (error) {
    next(error)
  }
})

router.delete("/:adId", async (req, res,next) => {
  try {
    await Ad.findByIdAndDelete(req.params.adId)
    res.send("Anuncio borrado")
  } catch (error) {
    next(error)
  }
})

module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Photo = mongoose.model("Photo");

// Landing page route
router.get("/", (req, res) => {
  res.render("index");

})

// Category page route
router.get("/category/:category", (req, res) => {
  console.log(req.params.category);
  res.render("category");

})

// Endpoint to upload photo
router.post("/upload", (req, res) => {
  const photo = new Photo({
    category: req.body.category,
    photo: req.body.photo,
  })
  photo.save().then((data) => {
    res.json({ message: "success" });
  })
})

// Endpoint to get photos based on category
router.post("/get_photos", (req, res) => {
  console.log(req.body);
  Photo.find({ category: req.body.category }).then((data) => {
    res.json({ message: data });
  })
})

// Endpoint to get category along with preview image
router.post("/getall", (req, res) => {
  Photo.find().then((data) => {
    let mp = new Map();
    data.forEach((item) => {
      mp.set(item.category, item.photo)
    })
    const info = Array.from(mp, ([category, photo]) => ({ category, photo }));
    res.json({ message: info });
  })
})

module.exports = router;
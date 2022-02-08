const express = require("express");
const Quality = require("../models/Quality");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const quality = await Quality.find();
    res.status(200).send(quality);
  } catch (e) {
    res.status(500).json({ message: "Server: error!" });
  }
});

module.exports = router;

const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });

router.get("/user", async (req, res) => {
  try {
    const list = await User.find();
    res.status(200).send(list); // if status=200, then you can not specify
  } catch (e) {
    res.status(500).json({ message: "Server: error!" });
  }
});
router.patch("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // todo: userId=currentUserId
    if (userId) {
      const updateUser = await User.findByIdAndUpdate(Userid, req.body, {
        new: true
      }); // flag new -> only after database update
      res.send(updateUser);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    res.status(500).json({ message: "Server: error!" });
  }
});

module.exports = router;

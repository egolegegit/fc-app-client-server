const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routers"));
router.use("/comment", require("./comment.routers"));
router.use("/profession", require("./profession.routers"));
router.use("/quality", require("./quality.routers"));
router.use("/user", require("./user.routers"));

module.exports = router;

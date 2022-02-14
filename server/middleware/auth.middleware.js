const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
  if (req.metod === "options") {
    return next;
  }

  try {
    // Bearer <token> !! space - important
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
    }

    req.user = tokenService.validateAccess(token);
    next();
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

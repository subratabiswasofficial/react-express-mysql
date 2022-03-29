const jwt = require("jsonwebtoken");

const userAccess = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.uid = decoded.uid;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
};

module.exports = { userAccess };

const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");
const { userAccess } = require("../services/auth");

router.get("/users/:roll", controller.getUser);
router.post("/users", controller.createUser);
router.delete("/users", controller.deleteUser);
router.put("/users", controller.updateUser);

router.post("/auth/register", controller.registerUser);
router.post("/auth/login", controller.loginUser);

/*
Private route
*/
router.get("/test", userAccess, (req, res) => {
  console.log(req.uid);
  return res.send("working bitch");
});

router.post("/link", userAccess, controller.createLink);
router.get("/link", userAccess, controller.getALLLinks);
router.get("/link/:id", userAccess, controller.getLink);

module.exports = router;

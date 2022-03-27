const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");

router.get("/users/:roll", controller.getUser);
router.post("/users", controller.createUser);
router.delete("/users", controller.deleteUser);
router.put("/users", controller.updateUser);

module.exports = router;

const { User } = require("../services/user");

const getUser = async (req, res) => {
  try {
    const { roll } = req.params;
    const user = await User.getUserByRoll(roll);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal server error");
  }
};

const createUser = async (req, res) => {
  try {
    const { name, roll, department } = req.body;
    console.log({ name, roll, department });
    const user = new User({ name, roll, department });
    await user.save();
    return res.status(201).json({ msg: "created", user: user.data() });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal server error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { roll } = req.body;
    await User.deleteUserByRoll(roll);
    return res.status(200).json({ msg: "deleted user" });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal server error");
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, roll, department } = req.body;
    const user = new User({ name, roll, department });
    await user.update();
    return res.status(200).json({ msg: "updated" });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal server error");
  }
};

module.exports = { getUser, createUser, deleteUser, updateUser };

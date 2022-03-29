const { User } = require("../services/user");
const { Link } = require("../services/Link");
const bcrypt = require("bcrypt");
const { v4: uuidV4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { links } = require("express/lib/response");

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

/*
errors
ER_DUP_ENTRY
*/
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const uid = uuidV4();
    const responseUid = await User.registerUser({
      email,
      uid,
      password: hashedPassword,
    });
    const token = jwt.sign({ uid: responseUid.uid }, process.env.JWT_KEY, {
      expiresIn: 60 * 60,
    });
    console.log(token);
    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.getUserByEmail(email);
    const isMatched = await bcrypt.compare(password, user.password);
    console.log(isMatched);
    if (isMatched) {
      const token = jwt.sign({ uid: user.uid }, process.env.JWT_KEY, {
        expiresIn: 60 * 60,
      });
      console.log(token);
      return res.status(201).json({ token });
    } else {
      return res.status(401).send("Invalid User");
    }
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};

/* ============================ */
const createLink = async (req, res) => {
  try {
    const { url } = req.body;
    const uid = req.uid;
    const genUrl = "gen url";
    const link = new Link({ url, uid, genUrl });
    await link.save();
    return res.status(201).send("New Link Created");
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};

const getALLLinks = async (req, res) => {
  try {
    const uid = req.uid;
    const links = await Link.getAllLinks(uid);
    console.log(links);
    return res.status(200).json(links);
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};

const getLink = async (req, res) => {
  try {
    const uid = req.uid;
    const { id } = req.params;
    const link = await Link.getLinkById(uid, id);
    console.log(link);
    return res.status(200).json(link);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  getUser,
  createUser,
  deleteUser,
  updateUser,
  registerUser,
  loginUser,
  createLink,
  getALLLinks,
  getLink,
};

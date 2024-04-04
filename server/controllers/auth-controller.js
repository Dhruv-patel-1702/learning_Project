const User = require("../models/user-model");
// const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("this is home page");
  } catch (err) {
    res.status(400).send({ msg: "page not found" });
  }
};

// ----------------------- register logic---------------------------------------

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    }

    // hash password
    // big number(10) very strong password
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });
    res.status(201).json({
      msg: "registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (err) {
    // res.status(500).json("internal server error");
    next(error);
  }
};

// ----------------------- login logic---------------------------------------

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        msg: "Login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      return res.status(401).json({ msg: "Invalid email or Password" });
    }
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

// to send User data- user logic

const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ msg: userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

module.exports = { home, register, login,user };

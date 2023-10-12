const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { AuthModel } = require("../models/auth.model")

const signUp = async (req, res) => {
  const { userName,userEmail, userPassword } = req.body;
  try {
    const user = await AuthModel.findOne({userEmail})
    if(user) return   res.status(400).json("User with the given email already exist!")
    if(!userName || !userEmail  || !userPassword)return res.status(400).json("All fields are required!")
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const userData = new AuthModel({userName, userEmail, userPassword: hashedPassword });
    await userData.save();
    res.status(201).json({ success: true, status: 201, message: "Registered Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, status: 500, message: "Failed to retrieve users data while registering" });
  }
};

const login = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  try {
    const userData = await AuthModel.findOne({ userEmail });
    if (userData) {
      const passwordMatch = await bcrypt.compare(userPassword, userData.userPassword);
      if (passwordMatch) {
        const token = jwt.sign({ _id: userData._id }, process.env.key);
        res.status(200).json({ success: true, status: 200, message: "Login Successful", user: userData, token: token });
      } else {
        res.status(401).json({ success: false, status: 401, message: "Invalid Credentials" });
      }
    } else {
      res.status(404).json({ success: false, status: 404, message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, status: 500, message: "Failed to retrieve users data while login" });
  }
};

const readUsers = async (req, res) => {
  try {
    const usersData = await AuthModel.find();
    res.status(200).json({ success: true, status: 200, message: "Users data retrieved successfully", data: usersData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, status: 500, message: "Failed to retrieve users data" });
  }
};
module.exports = { signUp, login,readUsers };

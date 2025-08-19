const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../model/user");

const Signup = async (req, res) => {
  try {
    // Check if the required fields are present
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({
          message: "Name, email, and password are required",
          success: false,
        });
    }

    // Destructure request body
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    // Create new user
    const newUser = new UserModel({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return res.status(201).json({
      message: "Signup successful",
      success: true,
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
      });
    }
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  Signup,
  Login,
};

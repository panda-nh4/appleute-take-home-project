import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/genToken.js";
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const checkExists = await User.findOne({ email });
  if (checkExists && (await checkExists.matchPassword(password))) {
    generateToken(res, checkExists._id);
    res.status(201).json({
      name: checkExists.name,
      email: checkExists.email,
      address: checkExists.address,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const logOut = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json("logged out");
});

const signUp = asyncHandler(async (req, res) => {
  const { name, email, address, password } = req.body;
  const checkExists = await User.findOne({ email });
  if (checkExists) {
    res.status(400);
    throw new Error("User exists");
  }
  const userCreated = await User.create({
    name,
    email,
    address,
    password,
  });
  if (userCreated) {
    generateToken(res, userCreated._id);
    res.status(201).json({
      name: userCreated.name,
      email: userCreated.email,
      address: userCreated.address,
    });
  } else {
    res.status(400);
    throw new Error("Bad data. Unable to create");
  }
});

const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    name: req.user.name,
    email: req.user.email,
    address: req.user.address,
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      name: updatedUser.name,
      email: updatedUser.email,
      address: updatedUser.address,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { login, logOut, signUp, getProfile, updateProfile };

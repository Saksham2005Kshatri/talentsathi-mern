import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// login the user get JWT token (/api/auth/login)Public access
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      city: user.city,
      job: user.job,
      phoneNumber: user.phoneNumber,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// register user (api/auth/signup)Public access
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, age, city, job, phoneNumber } = req.body;

  // see if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create new user
  const user = new User({
    name,
    email,
    password: hashedPassword,
    age,
    city,
    job,
    phoneNumber,
  });

  const savedUser = await user.save();

  if (savedUser) {
    generateToken(res, savedUser._id);

    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      age: savedUser.age,
      city: savedUser.city,
      job: savedUser.job,
      phoneNumber: savedUser.phoneNumber,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// logout user (api/auth/logout) Public access
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // expire right away
  });
  res.status(200).json({ message: "User logged  out" });
});

// Get profile route (/api/auth/profile) Private access
// need valid JWT token for access
const getProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    age: req.user.age,
    city: req.user.city,
    job: req.user.job,
    phoneNumber: req.user.phoneNumber,
  };
  res.status(200).json(user);
});

// GET route to access the update form
const getUpdateForm = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update form here you go." });
});

// update user profile PUT (/api/auth/profile) Private access
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  console.log(user.password);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.age = req.body.age || user.age;
    user.city = req.body.city || user.city;
    user.job = req.body.job || user.job;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    if (req.body.password) {
      // user.password = req.body.password;
      console.log("before...");
      console.log("The original password: ", user.password);
      console.log("The new password: ", req.body.password);
      // hash the new password as well
      user.password = await bcrypt.hash(req.body.password, 10);
      console.log("After...");
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      age: updatedUser.age,
      city: updatedUser.city,
      job: updatedUser.job,
      phoneNumber: updatedUser.phoneNumber,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

const deleteProfile = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.user._id);

  res.status(200).json(user);
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getProfile,
  getUpdateForm,
  updateProfile,
  deleteProfile,
};

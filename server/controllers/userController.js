import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import Token from "../models/token.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

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

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.BASE_URL}auth/signup/${savedUser._id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);

    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      age: savedUser.age,
      city: savedUser.city,
      job: savedUser.job,
      phoneNumber: savedUser.phoneNumber,
      message: "An email sent to your account",
    });
  } else {
    s;
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { userId, token } = req.params;

  console.log(
    `Verification request received for userId: ${userId} with token: ${token}`
  );

  try {
    console.log(`Looking for user with ID: ${userId}`);
    const user = await User.findById(userId);

    if (!user) return res.status(400).send({ message: "User not found" });

    const tokenNew = await Token.findOne({
      userId,
      token: token,
    });
    if (!tokenNew) {
      res.status(400).send({ message: "Invalid link" });
      console.log("TOKEN NOT FOUND");
    }

    // await User.updateOne({ _id: userId, verified: true });
    if (user) {
      user.verified = true;
      await user.save();
    }

    console.log("Updated user= ", user);

    // delete token
    await Token.findByIdAndDelete(userId);

    return res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    console.error(`Error during email verification: ${error.message}`, error);
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
      // hash the new password as well
      user.password = await bcrypt.hash(req.body.password, 10);
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
  verifyEmail,
  logoutUser,
  getProfile,
  getUpdateForm,
  updateProfile,
  deleteProfile,
};

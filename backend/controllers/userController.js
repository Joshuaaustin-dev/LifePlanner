import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const checkAuth = async (req, res) => {
  const token = req.cookies.access_token;
  if (token === undefined || token === null) {
    return res.json(false);
  }
  res.json(true);
};

export const getUser = async (req, res) => {
  const user = req.body;
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email: user.email }).select(
      "-password"
    );
    if (existingUser) {
      return res.status(200).json(existingUser);
    } else {
      throw "No existing user";
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error retrieving user");
  }
};

// DEBUG User Registration via POST method
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // Hash & salt the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user and save it
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering user");
  }
};

// DEBUG User login via POST method
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    //Checks if the username matches
    if (!user) {
      return res.status(400).send("User not found");
    }

    //Checks if the password of the user matches compare the provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Have ai generate a secure 32 byte JWT secret
    const token = jwt.sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // Set HTTP-only cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: "strict", // CSRF protection
      maxAge: 1 * 60 * 60 * 1000, // 1 hour in milliseconds
      secure: false,
      path: "/",
    });

    // Cookie has user info
    res.status(200).json({
      message: "Login successful",
    });

    /*
    res.status(200).json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });
    */
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    sameSite: "strict", // CSRF protection
    maxAge: 0, // expire
    secure: false,
    path: "/",
  });
  res.status(200).send("Logged out");
};

//Reset Password method
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please try again." });
    }

    // Update password hash before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ message: "Error resetting password." });
  }
};

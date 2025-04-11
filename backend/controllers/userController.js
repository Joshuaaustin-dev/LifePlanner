import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import moment from "moment";
import { config } from "dotenv";

config();
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

    // Streak logic
    const today = moment().startOf("day");
    const lastLogin = user.lastLogin ? moment(user.lastLogin).startOf("day") : null;

    console.log("Last Login:", lastLogin ? lastLogin.format() : "No previous login");
    console.log("Today's Date:", today.format());

    if (lastLogin) {
      const diff = today.diff(lastLogin, "days");
      console.log("Difference in days:", diff);
      
      if(diff === 1) {

        //continue streak
        user.loginStreak++;
                console.log("Continuing streak, new streak:", user.loginStreak);

      } else if (diff > 1) {

        //reset streak for missed days
        user.loginStreak = 1;
                console.log("Streak reset due to missed days, new streak:", user.loginStreak);

      } 
    } else {

      //first time logins set to 1
      user.loginStreak = 1;
            console.log("First time login, setting streak to 1");

    }

    //update to today when the user logs in
    user.lastLogin = new Date(); 
    await user.save();

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

// Variable to store confirmation codes
let verificationCodes = {};

//Send reset confirmation code method
export const sendResetCode = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    //generate 6 digit confirmation code
    const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString();
 
    //store the code in the variable associated with the user's email
    verificationCodes[email] = confirmationCode;

    // Use gmail to send reset code 
    // Use mailtrap if gmail doesn't work
    let transporterConfig = {};

    if (email.toLowerCase().endsWith("@gmail.com")) {
      // Use Gmail SMTP for Gmail addresses
      transporterConfig = {
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER, // your Gmail address
          pass: process.env.GMAIL_PASS // your Gmail app password
        },
      };
    } else {
      // Use Mailtrap for all other domains
      transporterConfig = {
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS,
        },
      };
    }

    const transporter = nodemailer.createTransport(transporterConfig);
    
    const mailOptions = {
      from: '"LifePlanner" <' + process.env.MAIL_USER + '>',
      to: email,
      subject: "Password Reset Confirmation Code",
      text: `Your confirmation code is: ${confirmationCode}`,
    };

    // Send the email with the confirmation code
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Reset code sent to your email." });

  } catch (err) {
    console.error("Error sending reset code:", err);
    res.status(500).json({ message: "Error sending reset code." });
  }
}

//Verification Endpoint
export const verifyResetCode = (req, res) => {
  const { email, code } = req.body;
  
  if (verificationCodes[email] && verificationCodes[email] === code) {
    res.status(200).json({ message: "Code verified." });
  } else {
    res.status(400).json({ message: "Invalid or expired code." });
  }
};


//Reset Password method
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  // Check if a code exists for this email
  if (!verificationCodes[email]) {
    return res.status(400).json({ message: "Please verify your email first." });
  }

  try {
    const user = await User.findOne({ email });
    
    // Check if a code exists for this email (meaning they should have verified it first)
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update password hash before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;

    //save the password
    await user.save();

    //delete the confirmation code
    delete verificationCodes[email];

    //display that the password updated successfully
    res.status(200).json({ message: "Password updated successfully." });
  } catch (err) {
    //handle errors
    console.error("Error resetting password:", err);
    res.status(500).json({ message: "Error resetting password." });
  }
};

//updateUser Controller Method
export const updateProfile = async (req, res) => {
  const { email, newName, newLocation, newBio, newProfilePicture  } = req.body;    

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please try again." });
    }

    user.name = newName;
    user.location = newLocation;
    user.bio = newBio;
    user.profilePicture = newProfilePicture;
    

    await user.save();
    res.status(200).json({ message: "Profile updated successfully." });

  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Error updating user information" });
  }
};


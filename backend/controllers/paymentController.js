import express from "express";
import Stripe from "stripe";
import { config } from "dotenv";
import User from "../models/User.js";

config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const session = async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    const { value, email } = req.body;

    if (!value || typeof value !== "number" || value <= 0 || !email) {
      console.error("Invalid request data:", req.body);
      return res.status(400).json({ error: "Invalid request data" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found:", email);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Creating Stripe session...");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `${value} Coins` },
            unit_amount: value * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/Shop?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:5173/Shop",
      metadata: { value, email },
    });

    console.log("Session created successfully:", session.id);
    res.json({ url: session.url });
  } catch (error) {
    console.error("Error in /create-session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Confirm the payment and update coins
export const confirmPayment = async (req, res) => {
  const { sessionId } = req.body;

  console.log("Received sessionId:", sessionId);

  if (!sessionId) {
    console.error("Error: Missing session ID");
    return res.status(400).json({ error: "Missing session ID" });
  }

  try {
    console.log("Retrieving session from Stripe...");
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    console.log("Stripe session details:", session);

    if (!session || session.payment_status !== "paid") {
      console.error("Error: Payment not completed or session is invalid");
      return res.status(400).json({ error: "Payment not completed" });
    }

    console.log("Extracting metadata...");
    const value = session.metadata?.value;
    const email = session.metadata?.email;
    console.log(`Extracted metadata -> value: ${value}, email: ${email}`);

    if (!value || !email) {
      console.error("Error: Invalid session metadata");
      return res.status(400).json({ error: "Invalid session metadata" });
    }

    console.log(`Searching for user with email: ${email}...`);
    const user = await User.findOne({ email });

    if (!user) {
      console.error("Error: User not found in database");
      return res.status(404).json({ error: "User not found" });
    }

    console.log(`Before update: user has ${user.coins} coins.`);
    user.coins += Number(value);
    await user.save();
    console.log(`After update: user now has ${user.coins} coins.`);

    res.json({ message: "Coins added successfully", coins: user.coins });
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


import mongoose from "mongoose";
import User from "../models/User.js";
import { config } from "dotenv";
import path from "path";


config({path: path.resolve("../.env")});
console.log("DB_URI:", process.env.DB_URI); // Debugging step

const migrateUsers = async () => {
    const mongoURI = process.env.DB_URI;

      if (!mongoURI) {
        console.error("Error: DB_URI is undefined. Check your .env file.");
        process.exit(1);
    }

    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        const result = await User.updateMany(
            {},
            {
                $set: {
                    profilePicture: "",
                    location: "",
                    bio: "",
                    achievements: [],
                    lastLogin: null,
                    loginStreak: 0,
                    Tokens: 0,
                },
            }
        );

        console.log(`${result.modifiedCount} users updated successfully`);
    } catch (error) {
        console.error("Could not update users: ",error);
    } finally {
        mongoose.connection.close();
    }
};

migrateUsers();
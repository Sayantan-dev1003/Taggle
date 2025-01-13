import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import userModel from "./models/userModel.js";
import questionModel from "./models/questionModel.js"

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Middleware for token verification
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, "Sayantan", (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// User registration
app.post("/register", async (req, res) => {
    const { fullname, email, password } = req.body;
    const existingUser = await userModel.findOne({ $or: [{ email }, { fullname }] });
    if (existingUser) return res.status(401).json("Something went wrong");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
        fullname,
        email,
        password: hashedPassword
    });

    const token = jwt.sign({ email: email, userid: user._id }, "Sayantan");
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Registration Successful" });
});

// User login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).json("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        const token = jwt.sign({ email: email, userid: user._id }, "Sayantan");
        res.cookie("token", token, { httpOnly: true });
        return res.status(200).json({ message: "Login Successful" });
    } else {
        return res.status(401).json("Invalid email or password");
    }
});

// Route to create a question
app.post("/api/questions", authenticateToken, async (req, res) => {
    const { title, description, tags } = req.body;

    // Validate the input
    if (!title || !description || !Array.isArray(tags) || tags.length > 5) {
        return res.status(400).json({ message: "Invalid input" });
    }

    try {
        const newQuestion = new questionModel({
            title,
            description,
            tags,
            author: req.user.userid // Use the authenticated user's ID
        });

        await newQuestion.save();
        res.status(201).json({ message: "Question created successfully", question: newQuestion });
    } catch (error) {
        console.error("Error creating question:", error); // Log the error for debugging
        res.status(500).json({ message: "Error creating question", error });
    }
});

app.get("/feed", authenticateToken, (req, res) => {
    res.status(200).json({ message: "Feed fetched successfully" });
})

// Route to get the full name of the authenticated user
app.get("/api/user/fullname", authenticateToken, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.userid);
        if (!user) return res.sendStatus(404);
        res.status(200).json({ fullName: user.fullname });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// User logout
app.get("/logout", (req, res) => {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    res.redirect("/");
});

// Catch-all route to serve the frontend
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(3000, () => console.log("Server started"));
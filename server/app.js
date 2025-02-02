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
import answerModel from "./models/answerModel.js"

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
    const existingUser  = await userModel.findOne({ $or: [{ email }, { fullname }] });
    if (existingUser ) return res.status(401).json("Something went wrong");

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

// Route the get current user's fullname
app.get("/api/user/userid", authenticateToken, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.userid);
        if (!user) return res.sendStatus(404);
        res.status(200).json({ userId: user._id });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Error fetching user" });
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
            authorID: req.user.userid,
        });

        await newQuestion.save();
        
        // Update the quesAsked attribute of userModel with the new question's id
        await userModel.findByIdAndUpdate(req.user.userid, { $addToSet: { quesAsked: newQuestion._id } }, { new: true });

        // Update the questionID attribute of answerModel with the new question's id
        await answerModel.updateMany({ questionID: newQuestion._id }, { $set: { questionID: newQuestion._id } });

        res.status(201).json({ message: "Question created successfully", question: newQuestion });
    } catch (error) {
        console.error("Error creating question:", error);
        res.status(500).json({ message: "Error creating question", error });
    }
});

app.get("/api/user/fullname", authenticateToken, async (req, res) => {
    const user = await userModel.findById(req.user.userid);
    if (!user) return res.sendStatus(404);
    res.status(200).json({ fullname: user.fullname });
})

// Route to get questions asked by the current user
app.get("/api/user/questions", authenticateToken, async (req, res) => {
    try {
        // Find the user and get their quesAsked array
        const user = await userModel.findById(req.user.userid).populate('quesAsked');
        if (!user) return res.sendStatus(404);

        // Extract the questions from the populated quesAsked
        const questions = user.quesAsked;

        // Populate the author's full name for each question
        const populatedQuestions = await questionModel.populate(questions, {
            path: 'authorID',
            select: 'fullname'
        });

        res.status(200).json({ questions: populatedQuestions });
    } catch (error) {
        console.error("Error fetching user's questions:", error);
        res.status(500).json({ message: "Error fetching user's questions" });
    }
});

// Route to get all questions
app.get("/api/display-questions", async (req, res) => {
    try {
        // Fetch all questions and populate the author's full name
        const questions = await questionModel.find()
            .populate('authorID', 'fullname') // Populate only the fullname
            .sort({ timestamp: -1 }); // Sort by timestamp

        res.status(200).json({ questions });
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ message: "Error fetching questions" });
    }
});

app.get("/feed", authenticateToken, (req, res) => {
    res.status(200).json({ message: "Feed fetched successfully" });
})

// Route to fetch questions by title
app.get("/api/questions/:title", async (req, res) => {
    const { title } = req.params;

    try {
        // Find the question based on the title
        const questions = await questionModel.find({ title: new RegExp(title, 'i') })
            .sort({ timestamp: -1 });

        if (questions.length === 0) {
            return res.status(404).json({ message: "No questions found with the given title" });
        }

        // Get the question ID
        const questionId = questions[0]._id;

        // Find the user whose quesAsked array contains the question ID
        const user = await userModel.findOne({ quesAsked: questionId }).select('fullname');

        // Prepare the response object
        const response = {
            questions,
            user: user ? { fullname: user.fullname } : { fullname: "Anonymous" } // Include user data
        };

        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ message: "Error fetching questions" });
    }
});

// Route to handle upvoting and downvoting
app.post("/api/questions/:title/vote", authenticateToken, async (req, res) => {
    const { title } = req.params;
    const { type, isAdding } = req.body;
    const userId = req.user.userid; // Ensure user ID is obtained correctly
  
    try {
      const question = await questionModel.findOne({ title });
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
  
      if (type === "upvote") {
        if (isAdding) {
          question.upvotes.addToSet(userId); // Add userId if not present
          question.downvotes.pull(userId);  // Remove from downvotes if present
        } else {
          question.upvotes.pull(userId);    // Remove userId
        }
      } else if (type === "downvote") {
        if (isAdding) {
          question.downvotes.addToSet(userId); // Add userId if not present
          question.upvotes.pull(userId);      // Remove from upvotes if present
        } else {
          question.downvotes.pull(userId);    // Remove userId
        }
      }
  
      await question.save();
      res.json({ question });
    } catch (error) {
      console.error("Error handling vote:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route to fetch answers for a specific question
app.get("/api/questions/:title/answers", async (req, res) => {
    const { title } = req.params;

    try {
        const question = await questionModel.findOne({ title });
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        const answers = await answerModel.find({ questionID: question._id })
            .populate('authorID', 'fullname') // Populate the author's full name
            .sort({ timestamp: -1 }); // Sort answers by timestamp in descending order

        res.status(200).json({ answers }); // Return all answers
    } catch (error) {
        console.error("Error fetching answers:", error);
        res.status(500).json({ message: "Error fetching answers" });
    }
});

// Route to post an answer for a specific question
app.post("/api/questions/:title/answers", authenticateToken, async (req, res) => {
    const { title } = req.params;
    const { content } = req.body; 

    if (!title || !content) {
        return res.status(400).json({ message: "Invalid input"});
    }

    try {
        const question = await questionModel.findOne({ title });
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        const newAnswer = new answerModel({
            content,
            questionID: question._id,
            authorID: req.user.userid
        });

        await newAnswer.save();

        // Update the question with the new answer's ID
        question.answers.push(newAnswer._id);
        await question.save();

        res.status(201).json({ message: "Answer posted successfully", answer: newAnswer }); 
    } catch (error) {
        console.error("Error posting answer:", error);
        res.status(500).json({ message: "Error posting answer" });
    }
});

app.post('/api/questions/:title/save', authenticateToken, async (req, res) => {
    const { title } = req.params;
    const userId = req.user.userid; // Get the user ID from the token

    try {
        // Find the question by title
        const question = await questionModel.findOne({ title });
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Check if the user ID is already in the saves array
        if (question.saves.includes(userId)) {
            return res.status(400).json({ message: "Question already saved" });
        }

        // Add the user ID to the saves array
        question.saves.push(userId);
        await question.save();

        return res.status(200).json({ message: "Question saved" });
    } catch (error) {
        console.error("Error saving question:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Endpoint to unsave a question
app.delete('/api/questions/:title/save', authenticateToken, async (req, res) => {
    const { title } = req.params;
    const userId = req.user.userid; // Get the user ID from the token

    try {
        // Find the question by title
        const question = await questionModel.findOne({ title });
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Check if the user ID is in the saves array
        if (!question.saves.includes(userId)) {
            return res.status(400).json({ message: "Question not saved" });
        }

        // Remove the user ID from the saves array
        question.saves = question.saves.filter(id => id.toString() !== userId);
        await question.save();

        return res.status(200).json({ message: "Question unsaved" });
    } catch (error) {
        console.error("Error unsaving question:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Endpoint to get saved questions for the authenticated user
app.get('/api/saved-questions', authenticateToken, async (req, res) => {
    const userId = req.user.userid; // Get the user ID from the token

    try {
        // Find all questions where the user ID is in the saves array
        const savedQuestions = await questionModel.find({ saves: userId });
        return res.status(200).json({ questions: savedQuestions });
    } catch (error) {
        console.error("Error fetching saved questions:", error);
        return res.status(500).json({ message: "Internal Server Error" });
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
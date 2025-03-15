require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const User = require("./models/user.model");
const Note = require("./models/note_model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

// Middleware to parse JSON
app.use(express.json());

// CORS configuration
app.use(
    cors({
        origin: "*", // Allows all origins (use specific origin(s) for better security)
        origin: "http://localhost:5173"
    })
);

// Route for the root URL
app.get("/", (req, res) => {
    res.send(`Hello from port 8000`);
});

// Route to handle registration
app.post("/create-account", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ error: true, message: "Username is required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ email: email });

  if(isUser) {
    return res.json({ error: true, message: "User already exist"});
  }

  const user = new User({
    username,
    email,
    password
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m"
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successfull"
  });
});

// Route to handle login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ error: true, message: "Email is required" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ error: true, message: "Password is required" });
    }

    const userInfo = await User.findOne({ email: email });

    if (!userInfo) {
      return res.status(400).json({ message: "User not found" });
    }

    if (userInfo.email == email && userInfo.password == password) {
      const user = { user: userInfo };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
      });

      return res.json({
        error: false,
        message: "Login Successfull",
        email,
        accessToken,
      });
    } else {
      return res
        .status(400)
        .json({ error: true, message: "Invalid email or password" });
    }
});

// Route to handle addition of notes
app.post('/add-note', authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  if (!content) {
    return res.status(400).json({ error: true, message: "Content is required" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.get('/get-notes', authenticateToken, async (req, res) => {
  const { user } = req;
  
  try {
    const notes = await Note.find({ userId: user._id });
    return res.json({
      error: false,
      notes,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Route to update an existing note
app.put('/update-note/:id', authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req;
  const noteId = req.params.id;

  if (!title || !content) {
    return res.status(400).json({ error: true, message: "Title and content are required" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    note.title = title;
    note.content = content;
    note.tags = tags || note.tags;

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Route to delete a note
app.delete('/delete-note/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  try {
    // Find the note by id and ensure it belongs to the authenticated user
    const note = await Note.findOne({ _id: id, userId: user._id });
    
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found or unauthorized" });
    }

    // Delete the note
    await Note.deleteOne({ _id: id });

    return res.json({
      error: false,
      message: "Note deleted successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error"
    });
  }
});

// Start the server on port 8000
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

module.exports = app;

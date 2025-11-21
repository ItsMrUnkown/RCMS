// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql2";
import bcrypt from "bcrypt";

const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5174", // your React app origin
  credentials: true
}));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",      // your MySQL username
  password: "",      // your MySQL password
  database: "rcms"   // your database name
});

db.connect(err => {
  if (err) {
    console.error("Database connection error:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

// ---------------- REGISTER ----------------
app.post("/register", async (req, res) => {
  const { email, password, location } = req.body;

  if (!email || !password || !location) {
    return res.json({ success: false, message: "Please fill in all fields." });
  }

  // Check if user exists
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.json({ success: false, message: err.message });

    if (results.length > 0) {
      return res.json({ success: false, message: "Email already registered." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const sql = "INSERT INTO users (email, password, location, role) VALUES (?, ?, ?, ?)";
    db.query(sql, [email, hashedPassword, location, "user"], (err, result) => {
      if (err) return res.json({ success: false, message: err.message });

      res.json({ success: true, message: "Registration successful!" });
    });
  });
});

// ---------------- LOGIN ----------------
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Please fill in both fields." });
  }

  // Check if admin
  if (email === "admin@example.com" && password === "admin123") {
    return res.json({
      success: true,
      user: { email, role: "admin" }
    });
  }

  // Check user in DB
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.json({ success: false, message: err.message });

    if (results.length === 0) {
      return res.json({ success: false, message: "Invalid email or password." });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ success: false, message: "Invalid email or password." });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        location: user.location
      }
    });
  });
});

// ---------------- START SERVER ----------------
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // adjust the path if needed

// POST /api/auth/login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // ✅ Send response with token and userId directly
        res.status(200).json({
            message: "Login successful",
            token,
            userId: user._id, // send separately for easier access
            user: {
                name: user.name,
                email: user.email,
                userId: user._id, // include again inside user object (optional)
            },
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Server error during login" });
    }
});

module.exports = router;

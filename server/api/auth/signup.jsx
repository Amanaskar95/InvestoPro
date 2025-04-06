router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // You can generate token here if needed

        res.status(201).json({
            message: "User registered successfully",
            user: {
                userId: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

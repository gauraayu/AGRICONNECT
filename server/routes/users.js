const express = require("express");
const User    = require("../models/User");
const router  = express.Router();

// GET all users (or filter by email)
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.email)    filter.email    = req.query.email;
    if (req.query.password) filter.password = req.query.password;

    const users = await User.find(filter);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST register user
router.post("/", async (req, res) => {
  try {
    const existing = await User.findOne({ email: req.body.email });
    if (existing) return res.status(400).json({ error: "Email already exists" });

    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH update user
router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
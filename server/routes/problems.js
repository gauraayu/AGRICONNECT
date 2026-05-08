const express = require("express");
const Problem = require("../models/Problem");
const router  = express.Router();

// GET all problems
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find().sort({ postedAt: -1 });
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single problem
router.get("/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ error: "Not found" });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new problem
router.post("/", async (req, res) => {
  try {
    const problem = new Problem(req.body);
    await problem.save();
    res.status(201).json(problem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH update problem (likes, upvotes, etc)
router.patch("/:id", async (req, res) => {
  try {
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!problem) return res.status(404).json({ error: "Not found" });
    res.json(problem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST add reply to problem
router.post("/:id/replies", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ error: "Not found" });

    problem.replies.push(req.body);
    await problem.save();
    res.json(problem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH vote on reply
router.patch("/:problemId/replies/:replyId/vote", async (req, res) => {
  try {
    const { type } = req.body;
    const problem  = await Problem.findById(req.params.problemId);
    if (!problem) return res.status(404).json({ error: "Not found" });

    const reply = problem.replies.id(req.params.replyId);
    if (!reply) return res.status(404).json({ error: "Reply not found" });

    if (type === "up")   reply.upvotes++;
    if (type === "down") reply.downvotes++;

    await problem.save();
    res.json(problem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE problem
router.delete("/:id", async (req, res) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);
    if (!problem) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
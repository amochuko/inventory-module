import express, { Request, Response } from "express";

const router = express.Router({ mergeParams: true });

// Define routes that should be contained here
router.get("/", (req, res) => {
  res.json({ data: "Users home page" });
});

router.get("/about", (req, res) => {
  res.json({ data: "About user" });
});

router.get("/search", (req, res) => {
  res.json({ data: req.query });
});

router.put("/user", (req, res) => {
  res.send(`Got a PUT reques at: ${req.url.toLowerCase()}`);
});

router.delete("/user", (req, res) => {
  res.send("Got a DELETE request at /user");
});

// testing profiler
router.get("/new-user", (req: Request, res: Response) => {
  try {
    res.status(200).send("New user created");
  } catch (err) {
    res.status(500);
  }
});

// test profiler (follow up)
router.get("/auth", (req, res) => {
  res.status(200).send("User authenticated");
});

export default router;

import express from "express";

const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  res.json({ msg: "Welcome to the Express Pack" });
});

export default router;

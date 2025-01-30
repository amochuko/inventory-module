import express from "express";

const router = express.Router({ mergeParams: true });

// Define routes that should be contained here
router.get("/", (req, res) => {
  res.json({ data: "Birds home page" });
});

router.get("/search", (req, res) => {
  res.json({ data: req.query });
});

router.get("/about", (req, res) => {
  res.json({ data: "About birds" });
});

router.get("/about/:param/:age", (req, res) => {
  console.log({ params: req.params });
  res.json({ data: "About birds" });
});

export default router;

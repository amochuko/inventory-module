import express, { Request, Response } from "express";
import crypto from "node:crypto";
import { User } from "../../utils/types";

const router = express.Router({ mergeParams: true });

const users: Record<string, User> = {};


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
router.get("/new-user", (req:Request, res:Response) => {
  let username = (req.query.username as string) || "";
  const password = (req.query.password as string) || "";

  username = username.replace(/[!@#$%^&*]/g, "");

  if (!username || !password || users[username]) {
    return res.sendStatus(400);
  }

  const salt = crypto.randomBytes(128).toString("base64");
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512");

  users[username] = { salt, hash };
  console.log({ users });

  res.status(200).send("New user created");
  
});

// test profiler (follow up)
router.get("/auth", (req, res) => {
  let username = (req.query.username as string) || "";
  const password = req.query.password || "";

  username = username.replace(/[!@#$%^&*]/g, "");

  if (!username || !password || !users[username]) {
    return res.sendStatus(400);
  }

  const { salt, hash } = users[username];

  crypto.pbkdf2(
    password as string,
    salt,
    10000,
    512,
    "sha512",
    (err, derivedKey) => {
      if (err) {
        return res.sendStatus(500);
      }
      if (crypto.timingSafeEqual(hash, derivedKey)) {
        res.status(200).send("User authenticated");
      } else {
        res.sendStatus(401);
      }
    }
  );
});

export default router;

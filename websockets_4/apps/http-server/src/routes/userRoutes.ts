import express, { Router } from "express";
import { Signin } from "../controllers/userController.js";
const router: Router = express.Router();

// router.post("/signup", Signup);
router.post("/signin", Signin);

export default router;

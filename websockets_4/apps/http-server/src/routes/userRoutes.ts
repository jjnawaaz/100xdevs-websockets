import express, { Router } from "express";
import { Signin, Signup } from "../controllers/userController.js";
const router: Router = express.Router();

router.post("/signup", Signup);

export default router;

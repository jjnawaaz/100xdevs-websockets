import express, { Request, Response } from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import "dotenv/config";

// import routes
import userRoutes from "./routes/userRoutes.js";

const app = express();

// PORT
const PORT = process.env.PORT;

// cors
app.use(cors());

// cookie-parser
app.use(cookieparser());

// req.body
app.use(express.json());

//ALL ROUTES
app.use("/user", userRoutes);

// health
app.get("/health", (req: Request, res: Response) => {
  res.send("All working good");
});

// start server
app.listen(PORT, () => {
  console.log("HTTP Server Started");
});

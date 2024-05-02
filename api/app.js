import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";
const app = express();

console.log("This is change file");
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

console.log(process.env.CLIENT_URL);

app.listen(8800, () => {
  console.log("Server is running");
});

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

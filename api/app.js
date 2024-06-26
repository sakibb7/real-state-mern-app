import express from "express";
import 'dotenv/config'
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import { verifyToken } from "./middleware/verifyToken.js";
import userRoute from "./routes/user.route.js";
const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || process.env.CLIENT_URL.includes(origin.replace(/\/$/, ""))) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

console.log(process.env.CLIENT_URL);

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

console.log(process.env.CLIENT_URL);

app.listen(8800, () => {
  console.log("Server is running");
});

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);

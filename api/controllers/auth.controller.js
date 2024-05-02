import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    //hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    //create a new user and save on db
    const newUser = await prisma.user.create({
      data: {
        username: userName,
        password: hashedPassword,
        email: email,
      },
    });

    console.log(newUser);
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const login = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username: userName },
    });

    if (!user) return res.status(404).json({ message: "user not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials" });

    //generate cookies and sent to the user
    // res.setHeader("Set-Cookie", "Test=" + "myValue").json("Success");

    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true
        maxAge: age,
      })
      .status(200)
      .json("Login Seccessfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login" });
  }
};
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "You are logged out" });
  console.log("Logout function executed");
};
import "dotenv/config";
import { prisma } from "../db/client.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// Add temporarily to the top of client.js
console.log("URL:", process.env.DATABASE_URL);
const register = async (req, res) => {
  const { name, email, password } = req.body;
  // console.log("REQ BODY:", req.body);

  try {
    const userExist = await prisma.user.findUnique({
      where: { email: email },
    });
    if (userExist) {
      return res
        .status(401)
        .json({ error: "User Already Exist With This Email" });
    }
  } catch (error) {
    console.log("FULL ERROR:", JSON.stringify(error, null, 2));
    console.log("ERROR CODE:", error.code);
    console.log("ERROR META:", error.meta);
    return res.status(500).json({ error: error.message });
  }

  //HASHING

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // cretae use r

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  //Generate Token
  const token = generateToken(user.id, res);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name: name,
        email: email,
      },
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid Email Or Password" });
  }
  //verify password

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid Email Or Password" });
  }

  //Generate TOKEN
  const token = generateToken(user.id, res);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email: email,
      },
      token,
    },
  });
};

const logout = async (req, res) =>{

res.cookie("jwt", "",{
    httpOnly: true,
    expires: new Date(0),
})
    res.status(200).json({
        status: "success",
        message:"Logged Out Successfully"
    });
}
export { register, login , logout};


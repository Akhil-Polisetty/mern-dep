const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const DuserModel = require('./models/DuserModel.js')
const dotenv=require('dotenv')

dotenv.config()

const app = express();
app.use(
  cors({
    origin: ["https://mern-dep-client.vercel.app"],
    methods: ["GET","POST"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/",(req,res)=>{
    res.json('hello world')
})

const conn=process.env.MONGO

mongoose
  .connect(conn)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));



  app.post("/register", async (req, res) => {
    try {
      const { name, email, password, city } = req.body;
      const existingUser = await DuserModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already registered" });
      }
      const newUser = {
        uname: name,
        email: email,
        password:password,
        city:city
      };
      console.log("new user is ", newUser);
      await DuserModel.create(newUser);
      console.log("after succesfully inserting");
      res.status(200).json({ message: "Registration Completed" });
    } catch (error) {
      console.log("Error Occurred at server 69: ", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


  app.listen(3001, () => {
    console.log("the server is running fine");
  });

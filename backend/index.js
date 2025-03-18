require('dotenv').config();
const express= require('express');
const cookieParser = require('cookie-parser');
const app= express();
const cors= require("cors");

const dbConnect= require("./db");

const userRouter= require("./routes/userRoutes");
const jobRouter= require("./routes/jobRoutes");

const corsConfig = {
    origin: "http://localhost:5173",
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    credentials: true,
    exposedHeaders: ['*', 'Authorization' ]
}

app.use(cors(corsConfig));

app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) => res.send("Welcome To Job Board"));
app.use("/user",userRouter);
app.use("/job",jobRouter);

dbConnect().then(()=>{
    app.listen(process.env.PORT, () => {
      console.log(`server started on port ${process.env.PORT}`);
    });
  })
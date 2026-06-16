const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());

connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req,res)=>{
res.send("Server Running");
});

app.listen(5000,()=>{
console.log("Server running on port 5000");
});
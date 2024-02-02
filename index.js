require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

/*Express App*/
const app = express();

/*Middlewares*/
app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

/*Test Api*/
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to our Server!" });
});

/*Routes*/
const bookRoutes = require("./routes/book.route");

/*Bypassed Apis*/
app.use("/api/books", bookRoutes);

/*Variables*/
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

/*DB connection*/
mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port : ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

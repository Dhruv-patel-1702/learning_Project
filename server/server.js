require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./utils/db");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const errorMiddleware = require("./middleware/error-middleware");

const corsOptions = {
  origin: "http://localhost:5173",
  methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials:true,
  optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use(errorMiddleware);

const PORT = 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

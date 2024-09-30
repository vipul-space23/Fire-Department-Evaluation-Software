const express = require("express");
const app = express();
const resourceRoutes = require("./routes/resourceRoutes");
const userRoutes = require("./routes/userRoutes");
const fireSafetyRoutes = require("./routes/reportRoutes");
const authenticate = require("./middlewares/authenticate");
const { errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const nocRoutes = require("./routes/nocRoutes");

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000", // Adjust the origin if necessary
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
    credentials: true, // Enable cookies to be sent
  })
);

const db = require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/noc", nocRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

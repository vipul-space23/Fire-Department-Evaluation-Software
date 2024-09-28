const express = require("express");
const app = express();
const resourceRoutes = require("./routes/resourceRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

const db = require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use("/api/resources", resourceRoutes);
// app.use("/api/users", userRoutes);

// app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

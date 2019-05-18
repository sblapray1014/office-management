const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB();

// Init middelware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/task", require("./routes/api/task"));
app.use("/api/template", require("./routes/api/template"));
app.use("/api/brokerage", require("./routes/api/brokerage"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

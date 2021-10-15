//dependencies
const express = require("express")
const PORT = process.env.PORT || 3000
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");


//initialize express app
const app = express();

//configure app settings
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

//connect to MongoDB
mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (error) => console.log('MongoDB Error ' + error.message));


//middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))
app.use(methodOverride("_method"))
app.use(morgan("dev"));

// Routes / Controllers
const marketController = require("./controllers/routes")
app.use("/", marketController)


app.listen(PORT, () => {
    console.log(`Express is listening on port ${PORT}`)
});
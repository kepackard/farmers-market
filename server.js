//dependencies
const express = require("express")
const PORT = process.env.PORT || 3000
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const Market = require("./models/market.js")

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


//ROUTES

//index route
app.get("/", (req, res) => {
    Market.find({}, (err, foundMarkets) => {
        res.render("index.ejs", {
            markets: foundMarkets
        })
    })
});

//new route
app.get("/new", (req, res) => {
    res.render("new.ejs")
});

//delete route
app.delete("/:id", (req, res) => {
    Market.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect("/")
    })
});


//update route
app.put("/:id", (req, res) => {
    Market.findByIdAndUpdate(
        req.params.id,
        req.body, 
        {
          new: true,  
        },
        (error, updatedMarket) => {
        res.redirect("/")
        }
    )   
});

// create route
app.post("/", (req, res) => {
    Market.create(req.body, (err, createdMarket) => {
        res.redirect("/")
    })
});

//edit route
app.get("/:id/edit", (req, res) => {
    Market.findById(req.params.id, (error, foundMarket) => {
        res.render("edit.ejs", {
            market: foundMarket,
        }) 
    })
});


//show route
app.get("/:id", (req, res) => {
    Market.findById(req.params.id, (err, foundMarket) => {
        res.render("show.ejs", {
        market: foundMarket,
        })
    })
});

app.listen(PORT, () => {
    console.log(`Express is listening on port ${PORT}`)
});
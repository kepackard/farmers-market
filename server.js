//dependencies
const express = require("express")
const app = express();
const PORT = process.env.PORT || 3000
const mongoose = require("mongoose");
require("dotenv").config();
const methodOverride = require("method-override");
const morgan = require("morgan");
const Market = require("./models/market.js")

//middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))
app.use(methodOverride("_method"))

//database
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (error) => console.log('MongoDB Error ' + error.message));

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
    Market[req.params.id] = req.body 
        res.redirect("/")
});


//edit route
app.get("/:id/edit", (req, res) => {
    Market.findById(req.params.id, (error, foundMarket) => {
        res.render("edit.ejs", {
            market: foundMarket,
        }) 
    })
});

// create route
app.post("/", (req, res) => {
    Market.create(req.body, (err, createdMarket) => {
    
        res.redirect("/")
    })
});

//show route
app.get("/:id", (req, res) => {
    res.render("show.ejs", {
        Market: markets[req.params.id],
    })
});

app.listen(PORT, () => {
    console.log(`Express is listening on port ${PORT}`)
});
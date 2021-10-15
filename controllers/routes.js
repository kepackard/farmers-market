//dependencies
const express = require("express")
const marketRouter = express.Router()
const Market = require("../models/market.js")

//ROUTES

//index route
marketRouter.get("/", (req, res) => {
    Market.find({}, (err, foundMarkets) => {
        res.render("index.ejs", {
            markets: foundMarkets
        })
    })
});

//new route
marketRouter.get("/new", (req, res) => {
    res.render("new.ejs")
});

//delete route
marketRouter.delete("/:id", (req, res) => {
    Market.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect("/")
    })
});


//update route
marketRouter.put("/:id", (req, res) => {
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
marketRouter.post("/", (req, res) => {
    Market.create(req.body, (err, createdMarket) => {
        res.redirect("/")
    })
});

//edit route
marketRouter.get("/:id/edit", (req, res) => {
    Market.findById(req.params.id, (error, foundMarket) => {
        res.render("edit.ejs", {
            market: foundMarket,
        }) 
    })
});


//show route
marketRouter.get("/:id", (req, res) => {
    Market.findById(req.params.id, (err, foundMarket) => {
        res.render("show.ejs", {
        market: foundMarket,
        })
    })
});

//exports
module.exports = marketRouter
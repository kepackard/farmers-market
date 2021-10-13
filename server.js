//dependencies
const express = require("express")
const app = express();
const PORT = process.env.PORT || 3000
const mongoose = require("mongoose");
require("dotenv").config();
const methodOverride = require("method-override");
const morgan = require("morgan");
const Market = require("./models/markets.js")

//middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))

//database
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (error) => console.log('MongoDB Error ' + error.message));

//ROUTES

//index route
app.get("/markets/", (req, res) => {
    Market.find({}, (err, foundMarkets) => {
        res.render("index.ejs", {
            markets: foundMarkets
        })
    })
});

//new route
app.get("/markets/new", (req, res) => {
    res.render("new.ejs")
});

// //delete route
// app.delete("/markets/:id", (req, res) => {
//     Market.findByIdAndRemove(req.params.id, (err, data) => {
//         res.redirect("/markets/")
//     })
// });


// // //update route
// // app.put("/markets/:indexOfMarketsArray", (req, res) => {
// //     varieties[req.params.indexOfMarketsArray] = req.body 
// //         res.redirect("/markets")
// // });


// //edit route
// app.get("/markets/indexOfApplesArray", (req, res) => {
//     res.render("edit.ejs", 
//         {
//             allMarkets: varieties[req.params.indexOfMarketArray], 
//             index: req.params.indexOfMarketsArray
//         }
//     )
// });

// create route
app.post("/markets", (req, res) =>
    Market.create(req.body, (err, createdMarket) => {
        res.redirect("/markets")
    })
);

// //show route
// app.get("/markets/:id", (req, res) => {
//     res.render("show.ejs", {
//         Market: markets[req.params.id],
//     })
// });

app.listen(PORT, () => {
    console.log(`Express is listening on port ${PORT}`)
});
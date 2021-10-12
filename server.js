const express = require("express")
const app = express();
const PORT = process.env.PORT || 3000

const varieties = require("./models/varieties.js")
require("dotenv").config();
app.use(express.urlencoded({ extended: false }))

//index route

app.get("/apples/", (req, res) => {
    res.render("index.ejs", {
        allVarieties: varieties,
        variety: varieties,
    })
});

//new route
app.get("/apples/new", (req, res) => {
    res.render("new.ejs")
});

//delete route
app.delete("/apples/indexOfApplesArray", (req, res) => {
    allVarieties.splice(req.params.indexOfApplesArray,1)
        res.redirect("/apples/")
});


//update route



//edit route
app.get("/apples/indexOfApplesArray", (req, res) => {
    res.render("edit.ejs", 
        {
            allVarieties: varieties[req.params.indexOfApplesArray], 
            index: req.params.indexOfApplesArray
        }
    )
});

// create route
app.post("/apples", (req, res) => {
    req.body = {
        name: req.body.name, 
        img: req.body.img,
        date: req.body.date,
        location: req.body.location,
        appearance: req.body.appearance,
        uses: req.body.appearance,
    },
        varieties.push(req.body);
    res.redirect("/apples")
});

//show route
app.get("/apples/:id", (req, res) => {
    res.render("show.ejs", {
        variety: varieties[req.params.id],
    })
});

app.listen(PORT, () => {
    console.log(`Express is listening on port ${PORT}`)
});
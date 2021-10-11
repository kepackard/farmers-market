const express = require("express")
const app = express();
const PORT = process.env.PORT || 3000

const varieties = require("./models/varieties.js")
require("dotenv").config();

//index route

app.get("/apples/", (req, res) => {
    // console.log(varieties)
    res.render("index.ejs", {
        allVarieties: varieties,
    })
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
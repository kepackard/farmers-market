const express = require("express")
const app = express();
const PORT = process.env.PORT || 3000

const varieties = require("./models/varieties.js")
require("dotenv").config();

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

//show route
app.get("/apples/:id", (req, res) => {
    res.render("show.ejs", {
        variety: varieties[req.params.id],
    })
});

//edit route
// app.get("/apples/indexOfApplesArray", (req, res) => {
//     res.render("edit.ejs, 
//         {
//             allVarieties: varieties[req.params.indexOfApplesArray], 
//             index: req.params.indexOfApplesArray
//         }
//     )
// });

app.listen(PORT, () => {
    console.log(`Express is listening on port ${PORT}`)
});
const express = require("express")
const app = express();
const PORT = process.env.PORT || 3000

const apples = require("./models/apples.ejs")
require("dotenv").config();

//index route

app.get("/apples", (req, res) =>
    res.send(apples)
);


app.listen(PORT, () => {
    console.log(`Express is listening on port ${PORT}`)
});
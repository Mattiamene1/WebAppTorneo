require('dotenv').config()

const express = require("express");
const path = require("path");

const app = express();
//dummy comment
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));
app.use("/assets", express.static(path.resolve(__dirname, "frontend", "assets")));
app.use("/css", express.static(path.resolve(__dirname, "frontend", "assets", "css")));
app.use("/font", express.static(path.resolve(__dirname, "frontend", "assets", "font")));
app.use("/images", express.static(path.resolve(__dirname, "frontend", "assets", "images")));
app.use("/js", express.static(path.resolve(__dirname, "frontend", "assets", "js")));

app.get("/registrati.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "registrati.html"));
});
app.get("/registratiMAF.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "registratiMAF.html"));
});
app.get("/loginMAF.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "loginMAF.html"));
});

app.get("/registratiArbitro.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "registratiArbitro.html"));
});
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});


app.set('port', process.env.PORT || 3000);

app.listen(process.env.PORT || 3000, () => console.log("Server running ...."));


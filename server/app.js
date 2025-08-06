const express = require("express");
const app = express()








app.get("/",(req,res)=>{
    res.send(`<h1>Welcome to server site</h1>`)
})




module.exports = app;
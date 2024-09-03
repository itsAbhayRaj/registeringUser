const mongoose = require("mongoose");

const db_uri = process.env.DB_URI;

mongoose.connect(db_uri)
    .then(()=>{
        console.log("MongoDB Connected...");
    }).catch((err)=>{
        console.log("MongoDB Connection Error: ",err);
    })
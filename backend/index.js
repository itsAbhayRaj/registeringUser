const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require("./connection/db");
const AuthRouter = require('./routes/AuthRouter');
const ProductRouter =require('./routes/ProductRouter')
const PORT = process.env.PORT || 8080;

app.get('/',(req,res)=>{
    res.send("Working");
})

app.use(bodyParser.json());
app.use(cors());

app.use("/auth",AuthRouter);
app.use("/products",ProductRouter);

app.listen(PORT,()=>{
    console.log(`server is live on http://localhost:${PORT}`)
})
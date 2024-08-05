const morgan = require("morgan")
const express = require('express');
const app = express();
const PORT = 5001;

app.use(morgan('dev'))

app.get("/test", (req, res)=>{
  res.status(200).json({message: "Hello from express"})
})



app.listen(PORT,()=>{
  console.log("Server listening on port 5001")
});
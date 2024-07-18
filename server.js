const express = require("express");

const app = express();

app.get('/',function(req,res){
  res.send("Sachal");
});


app.listen(9000,function(){
    console.log("Server Start at 9000");
})
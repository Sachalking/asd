const express = require("express");

const app = express();

app.get('/',function(req,res){
  res.sendFile("/home.html");
});


app.listen(9000,function(){
    console.log("Server Start at 9000");
})
const express = require("express");

const app = express();

app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){

    res.sendFile(__dirname+'/public/home.html');
  
});


app.listen(9000,function(){
    console.log("Server Start at 9000");
})
require('dotenv').config();

const express = require("express");
const https =require("https");

const bodyparser = require("body-parser");

var app =express();

const api_key=process.env.API_KEY;
const list = process.env.LIST_ID;

app.use(bodyparser.urlencoded({extended:true}));

   app.use(express.static("public"));
app.get("/",function(request,response){
   response.sendFile(__dirname+"/public/Newspaper.html");

  
});

app.post("/",function(req,res){
    const firstn=req.body.first;
    const lastn=req.body.last;
    const email=req.body.email;

    const data = {
      members: [
          {
              email_address: email,
              status: "subscribed",
              merge_fields: {
                  FNAME: firstn,
                  LNAME: lastn
              }
          }
      ]
  };

const jsondata =JSON.stringify(data);

const url = `https://us13.api.mailchimp.com/3.0/lists/${list}`;



const options = {
  method: 'POST',
  auth:`sachal:${api_key}`
};


     const request= https.request(url,options,function(respose){
        respose.on("data",function(data){

          if(respose.statusCode===200){
            res.sendFile(__dirname+"/public/success.html");
          }
          else{
            res.sendFile(__dirname+"/public/failure.html");
          }
            console.log(JSON.parse(data));
        })
      })

      app.post("/failure",function(rq,re){
        re.redirect("/");
      })
      request.write(jsondata);
      request.end();
});

app.listen(process.env.PORT || 9000,function(){
    console.log("server is started ");
});

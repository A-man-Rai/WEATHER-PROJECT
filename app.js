require('dotenv').config()
const express=require('express');
const bodyParser=require('body-parser');
const app=express();

const https=require('https');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
  res.sendFile(__dirname+"/index.html")
})  

app.post("/",function(req,res){
  const city=req.body.city;
  const url=`https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.API_ID}&q=`+city;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on('data',function(data){
      const weatherData=JSON.parse(data);
     const temp=weatherData.main.temp;
     const weatherDescription=weatherData.weather[0].description;
     const icon=weatherData.weather[0].icon;
     const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1>The Temperature in " +city+" is "+ temp +" Celsius</h1>");
      res.write("<p>The Weather is currently "+weatherDescription+"</p>");
      res.write("<img src="+imageURL +">");
      res.send();
    })
  })

})

app.post('\failure',function(){
  res.redirect("/");
})

app.listen(3000,function(){
    console.log("Server is Running on Port 3000.");
});
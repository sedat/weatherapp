const express = require('express')
    request = require('request'),
    app = express();



app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/", (req, res) => {
    res.render("search");
})


app.get("/weather", (req,res) => {
    var forecast;
    let city = req.query.city;
    request("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+ myID + "&units=metric", function(error, response, body) {
        if(!error && response.statusCode == 200){
        let data = JSON.parse(body);
        request("http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+ myID + "&units=metric", function(error, response, body) {
            if(!error && response.statusCode == 200){
            forecast = JSON.parse(body);
            res.render("index", {data: data, forecast: forecast})
            } 
        })
        
        } 
    })
    
})

app.listen(8080, function(){
    console.log("Serving");
})
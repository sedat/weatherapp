const express = require('express')
    request = require('request'),
    app = express();



app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/", (req, res) => {
    res.render("search");
})

app.get("/weather", (req,res) => {
    
    let city = req.query.city;
    request("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5013d165df18f7e63436e8539edfba03&units=metric", function(error, response, body) {
        if(!error && response.statusCode == 200){
        let data = JSON.parse(body);
        res.render("index", {data: data})
        } 
    })
    
})

app.listen(8080, function(){
    console.log("Serving");
})
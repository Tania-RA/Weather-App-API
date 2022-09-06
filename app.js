const {
  response
} = require('express');
const express = require('express');
const https = require('node:https');
// const Country = require('country-state-city').Country;
// const City = require('country-state-city').City;
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

//console.log(Country.getAllCountries());
// console.log(City.getAllCities());

app.get('/', (req, res) => {

  res.sendFile(__dirname + '/index.html');

});

app.post('/', (req, res) => {

  const city = req.body.countries;
  console.log(city);
  const apiID = "c1bd87b2c979f30e07aa08487f74eac2#"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiID;

  https.get(url, (response) => {
    // console.log(response.statusCode);

    response.on('data', (data) => {
      const weatherData = (JSON.parse(data));
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const img = weatherData.weather[0].icon;
      const imgURL = "https://openweathermap.org/img/wn/" + img + "@2x.png";
      // console.log(temp);
      // console.log(weatherDesc);
      res.write("<h1>Your are viewing the weather of " + city + "!</h1>");
      res.write("<h2>The temperature in " + city + " is " + temp + " degrees Celsius.</h2>");
      res.write("The weather is currently " + "'<em>" + weatherDesc + "'</em>");
      res.write('<br> <img src=' + imgURL + ' />');
      res.write('<br><input type="button" value="Go back!" onclick="history.back()">')
      res.send();
    })
  })

});




app.listen(3002, function () {
  console.log("Running");
})
const router = require("express").Router(); //manage routes
const axios = require("axios"); //loads the axios library for API
require("dotenv").config(); //makes the env file work

const newsURL = `https://newsapi.org/v2/everything?apiKey=${process.env.NEWS_SECRET}&q=`;
const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&exclude=minutely,alerts&appid=${process.env.WEATHER_SECRET}`;

router.get("/news", async (req, res) => {
  try {
    const urlWithQuery = newsURL + req.query.q;
    const newres = await axios.get(urlWithQuery);
    res.json(newres.data);
  } catch (err) {
    res.json({ msg: err });
  }
});

router.get("/weather", async (req, res) => {
  try {
    const urlWithQuery =
      weatherURL + "&lat=" + req.query.lat + "&lon=" + req.query.lon;
    const newres = await axios.get(urlWithQuery);
    res.json(newres.data);
  } catch (err) {
    res.json({ msg: err });
  }
});

module.exports = router;

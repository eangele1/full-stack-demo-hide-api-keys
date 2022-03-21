const router = require("express").Router(); //manage routes
const axios = require("axios"); //loads the axios library for API
require("dotenv").config(); //makes the env file work

const newsUrl = `https://newsapi.org/v2/everything?apiKey=${process.env.NEWS_SECRET}&q=`;

router.get("/", async (req, res) => {
  try {
    const urlWithQuery = newsUrl + req.query.q;
    const newres = await axios.get(urlWithQuery);
    res.json(newres.data.articles);
  } catch (err) {
    res.json({ msg: err });
  }
});

module.exports = router;

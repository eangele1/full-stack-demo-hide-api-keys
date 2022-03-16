const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5050;
require("dotenv").config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", require("./routes/api-routes"));

app.listen(PORT, () => {
  console.log("API key ===>", process.env.SECRET);
  console.log(`listening at http://localhost:${PORT}`);
});

// server/index.js

const express = require("express");
const axios = require('axios');

const PORT = process.env.PORT || 3001;

const app = express();
app.get("/temperature", (req, res) => {
  console.log(req.query)
  let data = ""
  axios.get('http://192.168.1.215:9999/temperature').then(resp => {
    console.log(resp.data)
    res.json({ message: resp.data })
  }).catch(err => {
    res.json({ 'Error': "Could not reach Xbox" })
  })
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

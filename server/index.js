// server/index.js

const express = require("express");
const axios = require('axios');

const PORT = process.env.PORT || 3001;

const app = express();



app.get("/v1/get_all_xbox", (req, res) => {


  let xboxqueryparams = req.query.xbox
  let promises = []
  let xboxdata = []
  if (Array.isArray(xboxqueryparams)) {
    for (var i in req.query.xbox) {
      const xbox_ip = req.query.xbox[i]
      const sys = axios.get(`http://${xbox_ip}:9999/system`);
      const syslink = axios.get(`http://${xbox_ip}:9999/systemlink`);
      const smc = axios.get(`http://${xbox_ip}:9999/smc`);
      const temp = axios.get(`http://${xbox_ip}:9999/temperature`);
      const livecache = axios.get(`http://${xbox_ip}:9999/title/live/cache`);
      const req_ = { 'xbox': xbox_ip, data: [] }
      xboxdata.push({ 'xbox': xbox_ip, data: {} })
      req_.data.push(sys)
      req_.data.push(syslink)
      req_.data.push(smc)
      req_.data.push(temp)
      req_.data.push(livecache)
      promises.push(req_)
    }
    Promise.allSettled(promises.map(function (entity) {
      return Promise.allSettled(entity.data.map(function (item) {
        return item;
      }));
    })).then(function (data) {
      for (var i = 0, l = data.length; i < l; i++) {
        for (k in data[i].value) {
          console.log("kuken i value", data[i].value[k])
          if (data[i].value[k].status == "rejected") {
            console.log(data[i].value[k].reason.config.url)
            var errorurl = new URL(data[i].value[k].reason.config.url)
            let formated_url = errorurl.pathname.replace("/", "")
            if (formated_url === "title/live/cache") {
              formated_url = "live"
            }
            var foundIndex = xboxdata.findIndex(x => x.xbox == errorurl.hostname);
            xboxdata[foundIndex].data[formated_url] = { 'error': 'not able to reach xbox' }
          }
          if (data[i].value[k].status == "fulfilled") {
            var url = new URL(data[i].value[k].value.config.url)
            var foundIndex = xboxdata.findIndex(x => x.xbox == url.hostname);
            let formated_url = url.pathname.replace("/", "")
            if (formated_url === "title/live/cache") {
              formated_url = "live"
            }
            xboxdata[foundIndex].data[formated_url] = data[i].value[k].value.data
          }
        }
      }
      res.json(xboxdata)
    })
  }
});
app.get("/system", (req, res) => {
  console.log(req.query)
  axios.get('http://192.168.1.215:9999/system').then(resp => {
    console.log(resp.data)
    res.json(resp.data)
  }).catch(err => {
    res.json({ 'Error': "Could not reach Xbox" })
  })
});
app.get("/title/live/cache", (req, res) => {
  console.log(req.query)
  axios.get('http://192.168.1.215:9999/title/live/cache').then(resp => {
    console.log(resp.data)
    res.json(resp.data)
  }).catch(err => {
    res.json({ 'Error': "Could not reach Xbox" })
  })
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

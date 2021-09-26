// server/index.js

const express = require("express");
const axios = require('axios');

const PORT = process.env.PORT || 3001;

const app = express();



app.get("/v1/get_all_xbox", (req, res) => {
  let xboxqueryparams = req.query.xbox
  let promises = []
  let xboxdata = []
  console.log(xboxqueryparams)
  // if (!Array.isArray(xboxqueryparams)) {
  //   console.log("balle")
  //   xboxqueryparams = []
  //   xboxqueryparams.push(req.query.xbox)
  // }
  if (Array.isArray(xboxqueryparams)) {
    for (var i in req.query.xbox) {
      const xbox_ip = req.query.xbox[i]
      const sys = axios.get(`http://${xbox_ip}:9999/system`);
      const syslink = axios.get(`http://${xbox_ip}:9999/systemlink`);
      const smc = axios.get(`http://${xbox_ip}:9999/smc`);
      const temp = axios.get(`http://${xbox_ip}:9999/temperature`);
      const livecache = axios.get(`http://${xbox_ip}:9999/title/live/cache`);
      const memory = axios.get(`http://${xbox_ip}:9999/memory`);
      const req_ = { 'xbox': xbox_ip, data: [] }
      xboxdata.push({ 'xbox': xbox_ip, data: {} })
      req_.data.push(sys)
      req_.data.push(syslink)
      req_.data.push(smc)
      req_.data.push(temp)
      req_.data.push(livecache)
      req_.data.push(memory)
      promises.push(req_)
    }
    Promise.allSettled(promises.map(function (entity) {
      return Promise.allSettled(entity.data.map(function (item) {
        return item;
      }));
    })).then(function (data) {
      for (var i = 0, l = data.length; i < l; i++) {
        for (k in data[i].value) {
          if (data[i].value[k].status == "rejected") {
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
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

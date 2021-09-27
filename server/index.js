// server/index.js

const express = require("express");
const axios = require('axios');

const PORT = process.env.PORT || 3001;

const app = express();

function generateUrl(ips) {
  let xboxdata = []
  let promises = []
  let ip_array = []
  const urlendpoints = ['system', 'systemlink', 'smc', 'temperature', 'title/live/cache', 'memory', 'systemlink/bandwidth']
  if (!Array.isArray(ips)) {
    console.log("ifnot array", ips)
    ip_array.push(ips)
  }
  else {
    ip_array = ips
  }
  for (var i = 0, l = ip_array.length; i < l; i++) {
    console.log("IPS", ip_array[i], i)
    const xbox_ip = ip_array[i]
    const urls = { 'xbox': xbox_ip, data: [] }
    for (var e = 0, a = urlendpoints.length; e < a; e++) {
      urls.data.push(axios.get(`http://${xbox_ip}:9999/${urlendpoints[e]}`))
    }
    xboxdata.push({ 'xbox': xbox_ip, data: {} })
    promises.push(urls)
  }
  return [promises, xboxdata]
}
app.get("/v1/get_all_xbox", (req, res) => {
  let xboxips = req.query.xbox
  let xboxdata = []
  let promises = generateUrl(xboxips)
  console.log("prmises", promises)
  xboxdata = promises[1]
  Promise.allSettled(promises[0].map(function (entity) {
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

});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

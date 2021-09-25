// server/index.js

const express = require("express");
const axios = require('axios');

const PORT = process.env.PORT || 3001;

const app = express();


app.get("/temperature", (req, res) => {
  let xboxqueryparams = req.query.xbox
  let promises = []
  let xboxdata = []
  let xboxurls = ['temperature', 'smc', 'bandwidth', 'state', 'systemlink', 'system', 'systemlink/bandwidth']
  if (Array.isArray(xboxqueryparams)) {
    console.log("hejsan")
    for (var i in req.query.xbox) {
      console.log("faking", i)
      const xbox_ip = req.query.xbox[i]
      xboxdata[i] = { 'xbox ip': xbox_ip, 'data': [], 'error': '' }
      console.log("xboxDATATATA", xboxdata[i])
      let loldex = 0
      //const url = `http://${xbox_ip}:9999/temperature`
      for (var endpoint in xboxurls) {
        console.log("endpoint", endpoint)
        const endpint = xboxurls[endpoint]
        const url = `http://${xbox_ip}:9999/${xboxurls[endpoint]}`
        promises.push(axios.get(url).then(resp => {
          console.log("xboxdata[ip]", xbox_ip)
          let dat = { [endpint]: resp.data }
          xboxdata[loldex].data.push(dat)

        }).catch(err => {

          let dat = { 'xbox ip': xbox_ip, 'data': "Could not reach Xbox" }
          //xboxdata[loldex].error = "Could not reach Xbox"
        }))
      }

    }
  }
  // else {
  //   const xbox_ip = req.query.xbox
  //   const url = `http://${xbox_ip}:9999/temperature`
  //   promises.push(axios.get(url).then(resp => {
  //     console.log(resp.data)
  //     let dat = { 'xbox ip': xbox_ip, 'data': resp.data }
  //     xboxdata.push(dat)
  //   }).catch(err => {
  //     let dat = { 'xbox ip': xbox_ip, 'data': "Could not reach Xbox" }
  //     xboxdata.push(dat)
  //   }))
  // }

  Promise.all(promises).then(responses => res.json(xboxdata))
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

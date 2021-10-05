import { useEffect, useState } from 'react'
import { ChakraProvider } from "@chakra-ui/react"
import { Box, Container, Grid, GridItem } from "@chakra-ui/react"
import DefaultLayout from './layout/DefaultLayout'
import {test_data} from './data'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation
} from "react-router-dom";
function App(props) {
  const [data, setData] = useState([])
  const [validateIp, setValidateIp] = useState()
  const history = useHistory()
  const location = useLocation();
  const queryParams = new URLSearchParams(history.location.search);

  function ValidateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
      return (true)
    }
    return (false)
  }
  function AddXbox(ip) {
    if (ValidateIPaddress(ip)) {
      queryParams.append("xbox", ip)
      history.push({
        pathname: '/',
        search: queryParams.toString()
      })
    }
    else {
      setValidateIp("Not a valid IP-address")
    }
  }
  function RemoveXbox(index) {
    let newData = [...data]
    let param = queryParams.getAll('xbox')
    let newParam = param.filter(xbox => xbox !== newData[index].xbox)
    for (let p in newParam) {
      if (p === 0) {
        newParam[p] = "?xbox=" + newParam[p]
      }
      else {
        newParam[p] = "&xbox=" + newParam[p]
      }
    }
    newData.splice(index, 1);
    setData(newData)
    history.push({
      pathname: '/',
      search: newParam.join('').toString()
    })
  }
  useEffect(() => {
    // console.log(queryParams.getAll('xbox'))
    // for (var i = 0, l = queryParams.getAll('xbox').length; i < l; i++) {
    //   console.log("hejsan", queryParams.getAll('xbox')[i], l)
    // }
    fetch(`/v1/get_all_xbox${history.location.search}`).then((res) => res.json()).then((data) => setData(data));
    const interval = setInterval(() => {
     fetch(`/v1/get_all_xbox${history.location.search}`).then((res) => res.json()).then((data) => setData(data))
    }, 5000)
    return () => clearInterval(interval);
  }, [location]);
  return (
    <Router>
      <Switch>
        <ChakraProvider>
          <Route path="/" render={(props) => <DefaultLayout {...props} data={data} validateIp={validateIp} AddXbox={AddXbox} RemoveXbox={RemoveXbox} />} />
        </ChakraProvider>
      </Switch>
    </Router>
  );
}
export default App

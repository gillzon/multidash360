import { useEffect, useState } from 'react'
import { ChakraProvider } from "@chakra-ui/react"
import { Box, Container, Grid, GridItem } from "@chakra-ui/react"
import DefaultLayout from './layout/DefaultLayout'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation
} from "react-router-dom";
function App(props) {
  const [data, setData] = useState([])
  const history = useHistory()
  const location = useLocation();
  const queryParams = new URLSearchParams(history.location.search);
  function AddXbox(ip) {
    console.log("ip")
    queryParams.append("xbox", ip)
    history.push({
      pathname: '/',
      search: queryParams.toString()
    })
  }
  function RemoveXbox(index) {
    console.log("ip", index)
    let newData = [...data]
    //newData[index].xbox
    let param = queryParams.getAll('xbox')
    let newParam = param.filter(xbox => xbox !== newData[index].xbox)
    for (let p in newParam) {
      if (p === 0) {
        newParam[p] = "?xbox=" + newParam[p]
      }
      else {
        newParam[p] = "&xbox=" + newParam[p]
      }
      console.log(newParam[p])
    }
    newData.splice(index, 1);
    setData(newData)
    // queryParams.getAll('xbox')
    // console.log(queryParams)
    history.push({
      pathname: '/',
      search: newParam.join('').toString()
    })
  }
  useEffect(() => {
    console.log(queryParams.getAll('xbox'))
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
          <Route path="/" render={(props) => <DefaultLayout {...props} data={data} AddXbox={AddXbox} RemoveXbox={RemoveXbox} />} />
        </ChakraProvider>
      </Switch>
    </Router>
  );
}
export default App

import { useEffect, useState } from 'react'
import { ChakraProvider } from "@chakra-ui/react"
import { Box, Container, Grid, GridItem } from "@chakra-ui/react"
import DefaultLayout from './layout/DefaultLayout'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  withRouter,
  useHistory
} from "react-router-dom";
function App(props) {
  const [data, setData] = useState([])
  const [query, setQuery] = useState("")
  const history = useHistory()
  const queryParams = new URLSearchParams(history.location.search);
  useEffect(() => {
    console.log(queryParams.getAll('xbox'))
    fetch(`/system/${history.location.search}`).then((res) => res.json()).then((data) => setData(prevState => ({ ...prevState, system: data })));
    const interval = setInterval(() => {
      fetch(`/temperature/${history.location.search}`).then((res) => res.json()).then((data) => setData(prevState => ({ ...prevState, temperature: data })))
      fetch("/title/live/cache").then((res) => res.json()).then((data) => setData(prevState => ({ ...prevState, title: data })))
    }, 5000)
    return () => clearInterval(interval);
  }, []);
  return (
    <Router>
      <Switch>
        <ChakraProvider>
          <Route path="/" render={(props) => <DefaultLayout {...props} data={data} />} />
        </ChakraProvider>
      </Switch>
    </Router>
  );
}
export default App

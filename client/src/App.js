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
    fetch(`/v1/get_all_xbox${history.location.search}`).then((res) => res.json()).then((data) => setData(data));
    const interval = setInterval(() => {
      fetch(`/v1/get_all_xbox${history.location.search}`).then((res) => res.json()).then((data) => setData(data))
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

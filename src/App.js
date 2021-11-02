import './App.css';
import { ChakraProvider, theme } from '@chakra-ui/react';
import {
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Login from '../src/views/Login';
import Distributor from './views/Distributor';
import PrivateRoute from './route/PrivateRoute';
import PublicRoute from './route/PublicRoute';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Router>
          <Switch>
            <PrivateRoute component={Distributor} path="/home" exact />
            <PublicRoute component={Login} restricted={true} path="/login" exact />
          </Switch>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;

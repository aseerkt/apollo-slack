import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import client from './config/apolloClient';
import Home from './screens/Home';
import Register from './screens/Register';
import Login from './screens/Login';
import CreateTeam from './screens/CreateTeam';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/create-team' component={CreateTeam} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;

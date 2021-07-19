import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import client from './config/apolloClient';
import Home from './screens/Home';
import Register from './screens/Register';
import Login from './screens/Login';
import CreateTeam from './screens/CreateTeam';
import ViewTeam from './screens/ViewTeam';
import useMeQuery from './hooks/apollo/queries/me';
import AuthProvider from './components/AuthProvider';
import Dashboard from './screens/Dashboard';

function PrivateRoute({ component: Component, ...rest }) {
  const { data } = useMeQuery();

  return (
    <Route
      {...rest}
      render={() => (data?.me ? <Component /> : <Redirect to='/' />)}
    />
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/create-team' component={CreateTeam} />
            <PrivateRoute path='/view-team' component={ViewTeam} />
            <PrivateRoute
              path='/client/T:teamId?/C:channelId?'
              component={ViewTeam}
            />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;

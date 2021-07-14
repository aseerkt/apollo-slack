import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import client from './config/apolloClient';
import Home from './screens/Home';
import Register from './screens/Register';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;

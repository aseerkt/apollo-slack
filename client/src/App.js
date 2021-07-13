import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import client from './config/apolloClient';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <h1>Hello World</h1>} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;

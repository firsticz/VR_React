import { ApolloProvider } from 'react-apollo'
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Group from './page/Group'
import GroupDetail from './page/GroupDetail'
import Login from './page/Login'
import setPassword from './page/EditPassword'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { AuthProvider, checkTokenExpired } from './context/AuthContext'

// ReactDOM.render(<App />, document.getElementById('root'));
const client = new ApolloClient({
  uri: process.env.REACT_APP_TRACKING_GRAPHQL_CLIENT,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.error({ graphQLErrors })
      }
      if (networkError) {
        console.error({ networkError })
      }
    }),
    // authMiddleware,
    new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_SERVER,
    }),
  ]),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Switch>
        {/* <Route path="/group/:id/:eventid" component={GroupDetail} />
        <Route path="/group/:id" component={GroupDetail} />
        <Route path="/group" component={Group} />
        <Route path="/rank" component={Group} /> */}
        <Route path="/login" component={Login} />
        <Route path="/callback" component={setPassword} />
 			  {/* <Route path="/" component={App} /> */}
        <AuthProvider>
          <Route path="/" component={App} />
        </AuthProvider>
      </Switch>

    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)
// ReactDOM.render(
//   <Router>
//     <Switch>
//       <Route path="/group/:id/:eventid" component={GroupDetail} />
//       <Route path="/group/:id" component={GroupDetail} />
//       <Route path="/group" component={Group} />
//       <Route path="/rank" component={Group} />
//       <Route path="/login" component={Login} />
//       <Route path="/callback" component={setPassword} />
// 			<Route path="/" component={App} />
    
//     </Switch>
//     <NotificationContainer/>
//   </Router>, document.getElementById('root'));

serviceWorker.unregister();

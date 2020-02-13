import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Group from './page/Group'
import GroupDetail from './page/GroupDetail'
import Login from './page/Login'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/group/:id/:eventid" component={GroupDetail} />
      <Route path="/group/:id" component={GroupDetail} />
      <Route path="/group" component={Group} />
      <Route path="/rank" component={Group} />
      <Route path="/login" component={Login} />
			<Route path="/" component={App} />
      
      {/* <Route path="*" component={App} /> */}
      {/* <Route render ={()=> < Group />} path="/group" />
      <Route render ={()=> < App />} path="/" /> */}
          {/* <Route render ={()=> < List />} path="/list" />
          <Route render ={()=> < Edit />} path="/edit/:id" />
          <Route render ={()=> < Create />} path="/create" />
          <Route render ={()=> < Show />} path="/show/:id" /> */}
    </Switch>
    <NotificationContainer/>
  </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import LoginMain from './components/Login/LoginMain';
import LoginForm from './components/Login/LoginForm';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LoginMain} />
            <Route path="/LoginForm" component={LoginForm} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

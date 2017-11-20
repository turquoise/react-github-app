import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Popular from './components/Popular';
import Battle from './components/Battle';
import Home from './components/Home';
import Nav from './components/Nav';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/popular" component={Popular} />
            <Route render={ () => {
              return (
                <p>Not Found</p>
              )
            }} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

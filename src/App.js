import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';

import Home from "./Home";
import {NoMatch} from "./NoMatch";
import {Contact} from "./Contact";
import {About} from "./About";
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import { Jumbotron } from './components/jumbotron'
import Layout2  from './components/Layout2';
function App() {
  return (
    <React.Fragment>
        <Router>
           <NavigationBar/>
           <Jumbotron/>
           <Layout>
            
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/contact" component={Contact}/>
            <Route component={NoMatch}/>
          </Switch>
          </Layout>
        </Router>
        
    </React.Fragment>
  );
}

export default App;

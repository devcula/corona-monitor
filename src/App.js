import React from 'react';
import './App.css';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import GlobalComponent from './components/GlobalComponent/GlobalComponent';
import CountryComponent from './components/CountryComponent/CountryComponent';
import MapComponent from './components/MapComponent/MapComponent';

export default function App() {
  return (
    <div className="App">
      <HashRouter basename="/">
          <header className="shadow-5 w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
            <nav className="f6 fw6 ttu tracked">
              <Link className="link dim white dib mr3" to="/">
                <span className="f3 tc">Global</span>
              </Link>
              <Link className="link dim white dib mr3" to="/countries">
                <span className="f3 tc">Countries</span>
              </Link>
              <Link className="link dim white dib mr3" to="/map">
                <span className="f3 tc">Map</span>
              </Link>
            </nav>
          </header>
          <Switch>
            <Route path="/map">
              <MapComponent />
            </Route>
            <Route path="/countries">
              <CountryComponent />
            </Route>
            <Route path="/">
              <GlobalComponent />
            </Route>
          </Switch>
      </HashRouter>
    </div>
  );
}
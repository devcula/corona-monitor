import React from 'react';
import './App.css';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import GlobalComponent from './components/GlobalComponent/GlobalComponent';
import CountryComponent from './components/CountryComponent/CountryComponent';
import Footer from './components/FooterComponent/Footer';

export default function App() {
  return (
    <div>
      <HashRouter basename="/">
        <div>
          <header className="bg-black-90 w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
            <nav className="f6 fw6 ttu tracked">
              <Link className="link dim white dib mr3" to="/">
                <span className="f3 tc">Global</span>
            </Link>
              <Link className="link dim white dib mr3" to="/country">
                <span className="f3 tc">Countries</span>
            </Link>
            </nav>
          </header>

          <Switch>
            <Route path="/country">
              <CountryComponent />
            </Route>
            <Route path="/">
              <GlobalComponent />
            </Route>
          </Switch>
        </div>
      </HashRouter>
      <Footer />
    </div>
  );
}
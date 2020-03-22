import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import GlobalComponent from './components/GlobalComponent/GlobalComponent';
import CountryComponent from './components/CountryComponent/CountryComponent';
import Footer from './components/FooterComponent/Footer';

// export default function App() {
//   let name = useFormInput('Abhishek Prasad'); //React Hook
//   let {width, height} = useWindowDimension();

//   return(
//     <div className="tc f1">
//       <input className="tc br4 ma4" {...name} />
//       <section>
//         <label>Window width: {width}</label>
//         <br/>
//         <label>Window height: {height}</label>
//       </section>
//     </div>
//   );
// }

// //Defining custom hooks to subscribe to form inputs and Window dimensions

// const useFormInput = (initialValue) => {
//   let [value, setValue] = React.useState(initialValue);

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   }

//   return {
//     value,
//     onChange: handleChange
//   }
// }

// const useWindowDimension = () => {
//   const [width, setWidth] = React.useState(window.innerWidth);
//   const [height, setHeight] = React.useState(window.innerHeight);

//   const handleDimensionsChange = () => {
//     setWidth(window.innerWidth);
//     setHeight(window.innerHeight);
//   }

//   React.useEffect(() => {
//     window.addEventListener('resize', handleDimensionsChange);
//     //Returning a cleanup function which will be automatically called by react to call during component unmount
//     return () => {
//       window.removeEventListener('resize', handleDimensionsChange);
//     }
//   })

//   return {
//     width,
//     height
//   }
// }

export default function App() {
  return (
    <Router>
      <div>
        <header>
          <nav>
            <Link to="/">
              <button className="w-50 bg-black-40 pa2 white br2 f3 pointer">Global</button>
            </Link>
            <Link to="/country">
              <button className="w-50 bg-black-40 pa2 white br2 f3 pointer">Countries</button>
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
        <Footer />
      </div>
    </Router>
  );
}
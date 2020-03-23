import React from 'react';
import './App.css';
import { HashRouter, Switch, Route, Link} from 'react-router-dom';
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
    <HashRouter basename="/">
      <div>
        <header className="bg-black-90 w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
          <nav className="f6 fw6 ttu tracked">
            <Link className="link dim white dib mr3" to="/">
              Global Statistics
            </Link>
            <Link className="link dim white dib mr3" to="/country">
              Country wise Statistics
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
    </HashRouter>
  );
}
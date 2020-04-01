import React from 'react';
import CountryList from '../CountryListComponent/CountryList';
import Scroll from '../ScrollComponent/Scroll';
import Loader from 'react-loader-spinner';
import './CountryComponent.css';
import Constants from '../../assets/Constants';
import Footer from '../FooterComponent/Footer';

export default function CountryComponent() {
    let [apiStatus, setApiStatus] = React.useState(Constants.LOADING);
    let [stats, setStats] = React.useState([]);
    let [searchValue, setSearchValue] = React.useState("");

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    }

    React.useEffect(() => {
        if (apiStatus === Constants.LOADING) {
            fetch("https://corona.lmao.ninja/countries/")
            .then(response => {
                if (response.status >= 200 && response.status <= 299) {
                    return response.json();
                }
                else {
                    throw Error(response.statusText);
                }
            })
            .then(currentStats => {
                setApiStatus(Constants.SUCCESS);
                setStats(currentStats);
            })
            .catch(err => {
                setApiStatus(Constants.FAILED);
            });
        }
    });

    if (apiStatus === Constants.LOADING) {
        return (
            <div className="component-div tc">
                <Loader
                    type="Audio"
                    color="#FFFFFF"
                    height={200}
                    width={200}
                    timeout={3000} //3 secs

                />
            </div>
        )
    }
    else if (apiStatus === Constants.FAILED) {
        return (
            <div className="tc f2 white component-div">
                <div className="error-div">
                    {Constants.FETCH_ERROR}
                </div>
            </div>
        )
    }
    else {
        //Filtering based on Searchbox
        if (searchValue) {
            stats = stats.filter((country_data) => {
                return country_data.country.toLowerCase().includes(searchValue.toLowerCase());
            });
        }

        //Sorting data based on total number of cases
        stats.sort((a, b) => {
            // return (parseInt(b.cases.replace(',', '')) - parseInt(a.cases.replace(',', '')));
            return (parseInt(b.cases) - parseInt(a.cases));
        })

        return (
            <div className="tc component-div">
                <input className="shadow-5 grow f4 br4 tc pa2 input-field" type="search" placeholder="Search By Country" onChange={handleSearchChange} />
                {
                    stats.length === 0 ?
                        <div className="f2 white ma4">
                            {Constants.NO_RESULTS_FOUND}
                        </div> :
                        <Scroll>
                            <CountryList countries_stat={stats} />
                        </Scroll>
                }
                <footer>
                    <Footer />
                </footer>
            </div>
        )
    }
}
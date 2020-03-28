import React from 'react';
import CountryList from '../CountryListComponent/CountryList';
import Scroll from '../ScrollComponent/Scroll';
import Loader from 'react-loader-spinner';
import './CountryComponent.css';
import Constants from '../../assets/Constants';

export default function CountryComponent() {
    let [ apiStatus, setApiStatus ] = React.useState(Constants.LOADING);
    let [ stats, setStats] = React.useState([]);
    let [ searchValue, setSearchValue] = React.useState("");

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    }

    React.useEffect(() => {
        if (apiStatus === Constants.LOADING) {
            fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
                headers: {
                    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                    "x-rapidapi-key": Constants.KEY
                }
            })
            .then(response => {
                if(response.status >= 200 && response.status <= 299){
                    return response.json();
                }
                else{
                    throw Error(response.statusText);
                }
            })
            .then(currentStats => {
                setApiStatus(Constants.SUCCESS);
                setStats(currentStats.countries_stat);
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
    else if(apiStatus === Constants.FAILED){
        return (
            <div className="tc f2 white component-div">
                Failed to fetch data. Try again after some time...
            </div>
        )
    }
    else{
        stats = stats.filter( (country) => {
            return country.country_name.toLowerCase().includes(searchValue.toLowerCase());
        });

        return (
            <div className="tc component-div">
                <input className="shadow-5 grow f4 br4 tc pa2 input-field" type="search" placeholder="Search By Country" onChange={handleSearchChange} />
                <Scroll>
                    <CountryList countries_stat={stats} />
                </Scroll>
            </div>
        )
    }
}
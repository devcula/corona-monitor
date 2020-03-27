import React from 'react';
import CountryList from '../CountryListComponent/CountryList';
import Scroll from '../ScrollComponent/Scroll';
import Loader from 'react-loader-spinner';
import './CountryComponent.css';

export default function CountryComponent() {
    let [ isLoading, setIsLoading ] = React.useState(true);
    let [ stats, setStats] = React.useState([]);
    let [ searchValue, setSearchValue] = React.useState("");

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    }

    React.useEffect(() => {
        if (isLoading) {
            fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
                headers: {
                    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                    "x-rapidapi-key": "4a407207dcmsh645ecf78c9883bdp182f98jsncc654a8c82ef"
                }
            }).then(response => {
                return response.json();
            }).then(currentStats => {
                setStats(currentStats.countries_stat);
                setIsLoading(false);
            });
        }
    });

    if (isLoading) {
        return (
            <div className="component-div tc">
                <Loader
                    type="Ball Triangle"
                    color="#FFFFFF"
                    height={200}
                    width={200}
                    timeout={3000} //3 secs

                />
            </div>
        )
    }
    else{
        stats = stats.filter( (country) => {
            return country.country_name.toLowerCase().includes(searchValue.toLowerCase());
        });

        return (
            <div className="tc component-div">
                <input className="shadow-5 grow f3 br4-l tc pa2 input-field" type="search" placeholder="Search By Country" onChange={handleSearchChange} />
                <Scroll>
                    <CountryList countries_stat={stats} />
                </Scroll>
            </div>
        )
    }
}
import React from 'react';
import Scroll from '../ScrollComponent/Scroll';
import Card from '../CardComponent/Card';
import Loader from '../LoaderComponent/Loader';

export default function GlobalComponent() {
    let [ isLoading, setIsLoading ] = React.useState(true);
    let [ stats, setStats] = React.useState({});

    React.useEffect( () => {
        if(isLoading){
            fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
                headers: {
                    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                    "x-rapidapi-key": "4a407207dcmsh645ecf78c9883bdp182f98jsncc654a8c82ef"
                }
            }).then(response => {
                return response.json();
            }).then(currentStats => {
                setStats(currentStats);
                setIsLoading(false);
            });
        }
    });

    if(isLoading){
        return (
            <Loader loading={isLoading} />
        )
    }
    else{
        return (
            <div className="tc component-div">
                <Scroll>
                    <Card>
                        <div className="f1">
                            Total cases
                    </div>
                        <div className="f3">
                            {stats.total_cases}
                        </div>
                    </Card>
                    <Card>
                        <div className="f1">
                            Total deaths
                    </div>
                        <div className="f3">
                            {stats.total_deaths}
                        </div>
                    </Card>
                    <Card>
                        <div className="f1">
                            Total Recovered
                    </div>
                        <div className="f3">
                            {stats.total_recovered}
                        </div>
                    </Card>
                    <Card>
                        <div className="f1">
                            New cases
                    </div>
                        <div className="f3">
                            {stats.new_cases}
                        </div>
                    </Card>
                    <Card>
                        <div className="f1">
                            New Deaths
                    </div>
                        <div className="f3">
                            {stats.new_deaths}
                        </div>
                    </Card>
                </Scroll>
            </div>
        )
    }
}
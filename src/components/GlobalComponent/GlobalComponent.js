import React from 'react';
import Scroll from '../ScrollComponent/Scroll';
import Card from '../CardComponent/Card';
import Loader from 'react-loader-spinner';

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
        return (
            <div className="tc component-div">
                <Scroll>
                    <Card>
                        <div className="white">
                            <div className="f1">
                                Total cases
                            </div>
                            <div className="f3 circle">
                                {stats.total_cases}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="white">
                            <div className="f1">
                                Total deaths
                            </div>
                            <div className="f3 circle">
                                {stats.total_deaths}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="white">
                            <div className="f1">
                                Total Recovered
                            </div>
                            <div className="f3 circle">
                                {stats.total_recovered}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="white">
                            <div className="f1">
                                New cases
                            </div>
                            <div className="f3 circle">
                                {stats.new_cases}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="white">
                            <div className="f1">
                                New Deaths
                            </div>
                            <div className="f3 circle">
                                {stats.new_deaths}
                            </div>
                        </div>
                    </Card>
                </Scroll>
            </div>
        )
    }
}
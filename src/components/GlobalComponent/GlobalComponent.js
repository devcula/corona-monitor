import React from 'react';
import Scroll from '../ScrollComponent/Scroll';
import Card from '../CardComponent/Card';
import Loader from 'react-loader-spinner';
import './GlobalComponent.css';
import Constants from '../../assets/Constants';
import Footer from '../FooterComponent/Footer';

export default function GlobalComponent() {
    let [apiStatus, setApiStatus] = React.useState(Constants.LOADING);
    let [ stats, setStats] = React.useState({});

    React.useEffect( () => {
        if(apiStatus === Constants.LOADING){
            fetch("https://corona.lmao.ninja/v2/all")
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
                console.log(err);
                setApiStatus(Constants.FAILED);
            });
        }
    });

    if(apiStatus === Constants.LOADING){
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
            <div className="tc component-div white f2">
                <div className="error-div">
                    {Constants.FETCH_ERROR}
                </div>
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
                                {stats.cases}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="white">
                            <div className="f1">
                                Total deaths
                            </div>
                            <div className="f3 circle">
                                {stats.deaths}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="white">
                            <div className="f1">
                                Total Recovered
                            </div>
                            <div className="f3 circle">
                                {stats.recovered}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="white">
                            <div className="f1">
                                New cases
                            </div>
                            <div className="f3 circle">
                                {stats.todayCases}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="white">
                            <div className="f1">
                                New Deaths
                            </div>
                            <div className="f3 circle">
                                {stats.todayDeaths}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="white">
                            <div className="f1">
                                Critical Cases
                            </div>
                            <div className="f3 circle">
                                {stats.critical}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="white">
                            <div className="f1">
                                Affected Countries
                            </div>
                            <div className="f3 circle">
                                {stats.affectedCountries}
                            </div>
                        </div>
                    </Card>
                    <footer>
                        <div className="footer-div">
                            <Footer updated={stats.updated}/>
                        </div>
                    </footer>
                </Scroll>
            </div>
        )
    }
}
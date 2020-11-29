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
                setStats(currentStats);
                setApiStatus(Constants.SUCCESS);
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
                            <div className="f2">
                                Total cases
                            </div>
                            <div className="f3 circle b">
                                {stats.cases.toLocaleString()}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="white">
                            <div className="f2">
                                Total deaths
                            </div>
                            <div className="f3 circle b">
                                {stats.deaths.toLocaleString()}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="white">
                            <div className="f2">
                                Total Recovered
                            </div>
                            <div className="f3 circle b">
                                {stats.recovered.toLocaleString()}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="white">
                            <div className="f2">
                                New cases
                            </div>
                            <div className="f3 circle b">
                                {stats.todayCases.toLocaleString()}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="white">
                            <div className="f2">
                                New Deaths
                            </div>
                            <div className="f3 circle b">
                                {stats.todayDeaths.toLocaleString()}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="white">
                            <div className="f2">
                                Critical Cases
                            </div>
                            <div className="f3 circle b">
                                {stats.critical.toLocaleString()}
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="white">
                            <div className="f2">
                                Affected Countries
                            </div>
                            <div className="f3 circle b">
                                {stats.affectedCountries.toLocaleString()}
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
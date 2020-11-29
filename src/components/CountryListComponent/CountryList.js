import React from 'react';
import Card from '../CardComponent/Card';
import './CountryList.css';

export default function CountryList({ countries_stat }) {
    return (
        <div>
            {
                countries_stat.map((country_stat, i) => {
                    return (
                        <Card key={i}>
                            <div className="white">
                                <div className="tc ma2">
                                    <img src={
                                        country_stat.countryInfo.iso2 == null ? 
                                        require('../../assets/flags/unknow.png') :
                                        require(`../../assets/flags/${country_stat.countryInfo.iso2.toLowerCase()}.png`)
                                    } alt="Country logo" height="64px" className="shadow-flag"/>
                                </div>
                                <div>
                                    <label className="b f2 tc i country_text">
                                        {country_stat.country}
                                    </label>
                                    <table className="w-100 country_table">
                                        <tbody>
                                            <tr>
                                                <td className="b f4">Total cases:</td>
                                                <td className="tl">{country_stat.cases.toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td className="b f4">Total deaths:</td>
                                                <td className="tl">{country_stat.deaths.toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td className="b f4">Recovered:</td>
                                                <td className="tl">{country_stat.recovered.toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td className="b f4">Active cases:</td>
                                                <td className="tl">{country_stat.active.toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td className="b f4">Critical cases:</td>
                                                <td className="tl">{country_stat.critical.toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td className="b f4">New deaths:</td>
                                                <td className="tl">{country_stat.todayDeaths.toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td className="b f4">New cases:</td>
                                                <td className="tl">{country_stat.todayCases.toLocaleString()}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Card>
                    )
                })
            }
        </div>
    )
}
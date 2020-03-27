import React from 'react';
import Card from '../CardComponent/Card';

export default function CountryList({ countries_stat }) {
    return (
        <div>
            {
                countries_stat.map((country_stat, i) => {
                    return (
                        <Card key={i}>
                            <div className="white">
                                <div>
                                    <label className="b f3 tc">
                                        {country_stat.country_name.toUpperCase()}
                                    </label>
                                    <table className="w-100">
                                        <tbody>
                                            <tr>
                                                <td className="b f4">Total cases:</td>
                                                <td className="tl">{country_stat.cases}</td>
                                            </tr>
                                            <tr>
                                                <td className="b f4">Total deaths:</td>
                                                <td className="tl">{country_stat.deaths}</td>
                                            </tr>
                                            <tr>
                                                <td className="b f4">Recovered:</td>
                                                <td className="tl">{country_stat.total_recovered}</td>
                                            </tr>
                                            <tr>
                                                <td className="b f4">New deaths:</td>
                                                <td className="tl">{country_stat.new_deaths}</td>
                                            </tr>
                                            <tr>
                                                <td className="b f4">New cases:</td>
                                                <td className="tl">{country_stat.new_cases}</td>
                                            </tr>
                                            <tr>
                                                <td className="b f4">Critical cases:</td>
                                                <td className="tl">{country_stat.serious_critical}</td>
                                            </tr>
                                            <tr>
                                                <td className="b f4">Active cases:</td>
                                                <td className="tl">{country_stat.active_cases}</td>
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
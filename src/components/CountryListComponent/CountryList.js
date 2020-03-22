import React from 'react';
import Card from '../CardComponent/Card';

export default function CountryList({countries_stat}) {
    return (
        <div>
            {
                countries_stat.map((country_stat, i) => {
                    return (
                        <Card key={i}>
                            <div>
                                <label className="b f4">
                                    Country:
                                </label> 
                                {country_stat.country_name}
                            </div>
                            <div>
                                <label className="b f4">
                                    Total cases:
                                </label> 
                                {country_stat.cases}
                            </div>
                            <div>
                                <label className="b f4">
                                    Total deaths:
                                </label> 
                                {country_stat.deaths}
                            </div>
                            <div>
                                <label className="b f4">
                                    Recovered:
                                </label> 
                                {country_stat.total_recovered}
                            </div>
                            <div>
                                <label className="b f4">
                                    New deaths:
                                </label> 
                                {country_stat.new_deaths}
                            </div>
                            <div>
                                <label className="b f4">
                                    New cases:
                                </label> 
                                {country_stat.new_cases}
                            </div>
                            <div>
                                <label className="b f4">
                                    Serious/Critical cases:
                                </label> 
                                {country_stat.serious_critical}
                            </div>
                            <div>
                                <label className="b f4">
                                    Active cases:
                                </label> {country_stat.active_cases}
                            </div>
                        </Card>
                    )
                })
            }
        </div>
    )
}
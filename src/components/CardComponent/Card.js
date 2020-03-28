import React from 'react';
import './CardComponent.css';

export default function Card(props) {
    return (
        <div className="tc bg-black-50 br3 ma3 grow dib pa3 bw2 card-shadow">
            {props.children}
        </div>
    )
}
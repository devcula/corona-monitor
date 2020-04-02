import React from 'react';
import './Card.css';

export default function Card(props) {
    return (
        <div className="tc bg-black-70 br3 ma3 grow dib pa3 bw2 card-shadow">
            {props.children}
        </div>
    )
}
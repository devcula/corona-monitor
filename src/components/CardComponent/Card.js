import React from 'react';

export default function Card(props) {
    return (
        <div className="tc bg-near-white br3 ma2 grow dib pa3 bw2 shadow-5">
            {props.children}
        </div>
    )
}
import React from 'react';

export default function Card(props) {
    return (
        <div className="tc bg-black-50 br3 ma3 grow dib pa3 bw2 shadow-5-l">
            {props.children}
        </div>
    )
}
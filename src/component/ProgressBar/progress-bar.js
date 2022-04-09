import React from 'react';
import './progress-bar.css';

function ProgressBar (props) {

    const { backgroundColor = '#5C55BF', width = 0, label = 'Progress',count = 0, color = '#FFFFFF'} = props;

    return (
        <div className="pg-container">
            <div className="pg-bar" style={{ backgroundColor: backgroundColor, width: width+'%' }}>
            </div>
            <div className="pg-data-labels" style={{ color: color }}>
                <p class="pg-label">{label}</p>
                <p class="pg-count">{count}</p>
            </div>
        </div>
    )
}

export default ProgressBar
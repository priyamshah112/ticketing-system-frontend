import React from 'react';
import './style.css';

function Error(props) {

    return(
        <div className="error-container">
            <h1 className="error-message">{props.errorMsg}</h1>
        </div>
    )
}

export default Error;
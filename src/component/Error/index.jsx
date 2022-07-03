import React from 'react';


function Error(props) {

    console.log(props);
    return(
        <h1>{props.errorMsg}</h1>
    )
}

export default Error;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout(props){
    props.setloggedIn(false)
    const navigate = useNavigate();

    if (!props.loggedIn) {
        navigate('/');
    }
    return(
        <div className="container">

        </div>
    )
}

export default Logout
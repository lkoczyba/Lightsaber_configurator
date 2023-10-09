import React from 'react';
import {Link} from "react-router-dom";

const Navigation = ({currentUser}) => {
    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li className="navigation__link"><Link to="/">Home</Link></li>
                <li className="navigation__link"><Link to="/createLightsaber/EditOn">Create Lightsaber</Link></li>
                <li className="navigation__link"><Link to="/gallery">Gallery</Link></li>
                <li className="navigation__link"><Link to="/login">Sign In</Link></li>
            </ul>
            <p>{currentUser}</p>
        </nav>
    );
};

export default Navigation;
import { Link } from 'react-router';
import React from 'react';

const Header = (props) => {
    return (
        <div className="Home-header">
          <h2><Link to="/">Movie Recommendations</Link></h2>
        </div>
    );
}

export default Header;

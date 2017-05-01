import { Link } from 'react-router';
import React from 'react';
import { Glyphicon } from 'react-bootstrap';

const Header = (props) => {
    return (
        <div className="Home-header">
          <h2><Link to="/"><Glyphicon glyph="film" /> MOVIE GUIDE <Glyphicon glyph="film" /> </Link></h2>
        </div>
    );
}

export default Header;

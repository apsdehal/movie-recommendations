import { Link } from 'react-router';
import React, { Component } from 'react';
import { Glyphicon, Modal, Button } from 'react-bootstrap';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
        <div className="Home-header">
          <h2>
          <Link to="/"><Glyphicon glyph="film" /> MOVIE GUIDE <Glyphicon glyph="film" /> </Link>
          </h2>
          <Button className="help-button" bsStyle="danger" onClick={this.open.bind(this)}>help</Button>
          <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Welcome to Movie Guide</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              To find your recommended movies:
              <ul>
                <li> Use search to find a movie you like.</li>
                <li> You can search via actor name, director name or movie title.</li>
                <li> You can also specify particular genre from dropdown and your minimum IMDb score.</li>
                <li> Hover over a movie to get its description.</li>
                <li> Click on the select movie to get its recommendations.</li>
                <li> Enjoy! </li>
              </ul>
              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle="primary" onClick={this.close.bind(this)}>Close</Button>
              </Modal.Footer>
          </Modal>
        </div>
    );
  }
}

export default Header;

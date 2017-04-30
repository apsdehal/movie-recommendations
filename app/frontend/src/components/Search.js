import React, { Component } from 'react';
import { FormGroup, FormControl, Form, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router';

import "./Search.css";
import axios from 'axios';
import constants from "../constants";

class Search extends Component {
  constructor(props) {
    super(props);
    axios.default.responseType = "json";
  }

  handleClick(e) {
    if (e.type === "keypress") {
      if (e.key !== "Enter") {
        return;
      } else {
        e.preventDefault();
      }
    } else {
      e.preventDefault();
    }

    let payload = {};
    payload["search_type"] = this.searchInput.value;
    payload["query"] = this.queryInput.value;
    let that = this;
    axios.post(constants.baseUrl + "/search", JSON.stringify(payload)).then((response) => {
       let data = response.data;
       that.props.handler({items: response.data});

       if (data.length) {
           if (!data[0]["_source"]["movie_plot"]) {
               this.getPlotAndThumbnail(data);
           }
       }
    });
  }

  getPlotAndThumbnail(data) {
    let requests = []
    for(let i = 0; i < data.length; i++) {
      let imdbId = data[i]["_source"]["movie_imdb_link"].split("/")[4];
      let axiosCall = function () {
        return axios.get(constants.omdbLink + "?i=" + imdbId);
      }
      requests.push(axiosCall());
     }
     axios.all(requests).then( (responses) => {
      for(let i = 0; i < responses.length; i++) {
         let response = responses[i]["data"]
         data[i]["_source"]["movie_poster"] = response["Poster"];
         data[i]["_source"]["movie_plot"] = response["Plot"] || response["Plot"].substr(0, 75);
      }
      this.props.handler({items: data});
    });
  }

  navigate() {
    this.props.router.push("/");
  }

  render() {
    let that = this;
    return (
      <div>
        <Form className="search-form" inline>
          <FormGroup>
            <FormControl componentClass="select" name="search_type" defaultValue="movie_title" inputRef={(input) => that.searchInput = input}>
              <option value="actor_names">Actor</option>
              <option value="director_name">Director</option>
              <option value="movie_title">Movie Name</option>
            </FormControl>

            <FormControl type="text" name="query" onClick={this.navigate.bind(this)} defaultValue="" inputRef={(input) => that.queryInput = input} onKeyPress={that.handleClick.bind(that)} />
          </FormGroup>
        </Form>
        <Button className="search-button" bsStyle="success" onClick={that.handleClick.bind(that)}>Search</Button>
      </div>
    )
  }
};

export default withRouter(Search);

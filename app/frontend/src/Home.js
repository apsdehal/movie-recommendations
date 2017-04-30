import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';
import constants from "./constants";
import Thumbnail from "./components/Thumbnail";
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';


class Home extends Component {
  constructor() {
      super();
      this.state = { items: [] };
      this.vars = {
          search_type: 'actor_names',
          query: ''
      };

      axios.default.responseType = "json";
  }

  handleClick(e) {
      e.preventDefault();
      let payload = {};
      payload["search_type"] = this.searchInput.value;
      payload["query"] = this.queryInput.value;
      let that = this;
      axios.post(constants.baseUrl + "/search", JSON.stringify(payload)).then((response) => {
         let data = response.data;
         that.setState({items: response.data});

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
           this.setState({items: data});
       });
  }

  render() {
    let that = this;
    return (
      <div className="Home">
        <div className="Home-header">
          <h2>Movie Recommendations</h2>
        </div>
        <div className="Home-intro container">
            <div>
                <label>Select main search type
                    <select name="search_type" defaultValue="actor_names" ref={(input) => that.searchInput = input}>
                        <option value="actor_names">Actor</option>
                        <option value="director_name">Director</option>
                        <option value="movie_title">Movie Name</option>
                    </select>
                </label>
                <label>
                    <input name="query" defaultValue="" ref={(input) => that.queryInput = input} />
                </label>
                <Button bsStyle="success" onClick={that.handleClick.bind(that)}>Search</Button>
            </div>
            <div className="row movie-list">
            {

                this.state.items.map((item, index) => {
                    item = item["_source"];
                    return <Thumbnail item={item} key={index} index={index}></Thumbnail>;
                })
            }
            </div>

         </div>
       </div>
    );
  }
}

export default Home;

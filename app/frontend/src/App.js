import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import constants from "./constants";
import ReactTooltip from "react-tooltip";

class App extends Component {
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
         let requests = []
         that.setState({items: response.data});

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
                 data[i]["_source"]["movie_thumbnail"] = response["Poster"];
                 data[i]["_source"]["movie_plot"] = response["Plot"] || response["Plot"].substr(0, 75);
             }
             this.setState({items: data});
         });
      });
  }

  render() {
    let that = this;
    return (
      <div className="App">
        <div className="App-header">
          <h2>Movie Recommendations</h2>
        </div>
        <div className="App-intro container">
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
                <button onClick={that.handleClick.bind(that)}>Search</button>
            </div>
            <div className="row movie-list">
            {

                this.state.items.map((item, index) => {
                    item = item["_source"]
                    return (
                        <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-xs1-8 col-xs-12">
                           <div className="item">
                              <a data-tip data-for={"item" + index} className="poster" href={item["movie_imdb_link"]}>
                                <img src={item["movie_thumbnail"]} alt={item["movie_title"]}/>
                                <span className="name">{item["movie_title"]}</span>
                              </a>
                              <ReactTooltip place="right" effect="solid" className="item-tooltip" id={"item" + index} type="dark">
                                <div><b>Title:</b> {item["movie_title"]}</div>
                                <div><b>Actor:</b> {item["actor_names"][0]}, {item["actor_names"][1]}</div>
                                <div><b>Director:</b> {item["director_name"]}</div>
                                <div><b>IMDB Score:</b> {item["imdb_score"] + "/10"}</div>
                                <div><b>Plot:</b> {item["movie_plot"]}</div>
                              </ReactTooltip>
                           </div>
                        </div>
                    )
                })
            }
            </div>

         </div>
       </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
      super();
      this.state = { items: [] };
      this.vars = {
          search_type: 'actor_names',
          query: ''
      };
      this.axiosInstance = axios.create({
          baseUrl: 'http://localhost:9999/search',
          responseType: 'json',

      });
  }

  handleClick(e) {
      e.preventDefault();
      let payload = {};
      payload["search_type"] = this.searchInput.value;
      payload["query"] = this.queryInput.value;
      let that = this;
      this.axiosInstance.post("http://localhost:9999/search", JSON.stringify(payload)).then((response) => {
         that.setState({items: response.data});
      });
  }

  render() {
    let that = this;
    return (
      <div className="App">
        <div className="App-header">
          <h2>Movie Recommendations</h2>
        </div>
        <div className="App-intro">
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
        </div>
        <div>
        {
            that.state.items.length && that.state.items.map((item, i) => {

                item = item["_source"];
                return (
                  <div key={i}>
                      <span><a href={item["movie_imdb_link"]}>{item["movie_title"]}</a></span>
                      <span>{item["director_name"]}</span>
                      <span>{item["imdb_score"]}</span>
                      <span>{item["actor_names"][0]}, {item["actor_names"][1]}</span>
                  </div>
                )
            }
          )
        }
        </div>

      </div>
    );
  }
}

export default App;

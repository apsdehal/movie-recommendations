import React, { Component } from 'react';
import './Movie.css';
import axios from 'axios';
import constants from "./constants";
import ReactTooltip from "react-tooltip";

class Movie extends Component {
  constructor() {
      super();
      this.state = { movie: {}, items: [] };

      axios.default.responseType = "json";
  }

  getRecommendations() {
      let that = this;
      axios.get(constants.baseUrl + "/info/" + this.props.params.id).then((response) => {
          let data = response.data;
          let items = this.state.items;
          this.setState({movie: data, items: items});
      })
      axios.get(constants.baseUrl + "/recommend/" + this.props.params.id).then((response) => {
         let data = response.data;
         let movie = that.state.movie;
         that.setState({movie: movie, items: data['hits']});
      });
  }
  componentWillMount() {
      this.getRecommendations();
  }
  render() {
    let movie = this.state.movie['_source'] || {};
    return (
      <div className="Home">
        <div className="Home-header">
          <h2>Movie Recommendations</h2>
        </div>
        <div className="Home-intro container">
            <div className="row movie-list">
                <div className="col-lg-3 col-md-4 col-sm-6 col-xs1-8 col-xs-12">
                {
                    Object.keys(movie).length &&
                        <div className="item">
                           <a data-tip data-for="main-movie" className="poster" href={movie["movie_imdb_link"]}>
                             <img src={movie["movie_poster"]} alt={movie["movie_title"]}/>
                             <span className="name">{movie["movie_title"]}</span>
                           </a>
                           <ReactTooltip place="right" effect="solid" className="item-tooltip" id="main-movie" type="dark">
                             <div><b>Title:</b> {movie["movie_title"]}</div>
                             <div><b>Actor:</b> {movie["actor_names"][0]}, {movie["actor_names"][1]}</div>
                             <div><b>Director:</b> {movie["director_name"]}</div>
                             <div><b>IMDB Score:</b> {movie["imdb_score"] + "/10"}</div>
                             <div><b>Plot:</b> {movie["movie_plot"]}</div>
                           </ReactTooltip>
                        </div>
                }
                </div>
            </div>
            <div>
            Recommendations
            </div>
            <div className="row movie-list">
            {

                this.state.items.length && this.state.items.map((item, index) => {
                    item = item["_source"]
                    return (
                        <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-xs1-8 col-xs-12">
                           <div className="item">
                              <a data-tip data-for={"item" + index} className="poster" href={item["movie_imdb_link"]}>
                                <img src={item["movie_poster"]} alt={item["movie_title"]}/>
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

export default Movie;

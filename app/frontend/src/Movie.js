import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';
import constants from "./constants";
import ReactTooltip from "react-tooltip";
import { Link } from 'react-router';

class Movie extends Component {
  constructor() {
      super();
      this.state = { movie: {}, items: [] };

      axios.default.responseType = "json";
  }

  getRecommendations(id) {
      let that = this;
      axios.get(constants.baseUrl + "/info/" + id).then((response) => {
          let data = response.data;
          let items = this.state.items;
          this.setState({movie: data, items: items});
      })
      axios.get(constants.baseUrl + "/recommend/" + id).then((response) => {
         let data = response.data;
         let movie = that.state.movie;
         that.setState({movie: movie, items: data['hits']});
         data = data["hits"]
         if (data.length) {
              if (!data[0]["_source"]["movie_plot"]) {
                  this.getPlotAndThumbnail(data);
              }
         }
      });
  }

  componentWillReceiveProps(nextProps) {  // when props change!
    if (nextProps.params.id !== this.props.params.id) {
        this.getRecommendations(nextProps.params.id);
    }
  }

  componentWillMount() {
      this.getRecommendations(this.props.params.id);
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
    let movie = this.state.movie['_source'] || {};
    return (
      <div className="Home">
        <div className="Home-header">
          <h2><Link to="/">Movie Recommendations</Link></h2>
        </div>
        <div className="Home-intro container">
            <div className="row movie-list">
                <div className="col-lg-offset-10 col-md-offset-10 col-sm-offset-9 col-xs1-offset-8 col-xs-offset-6 col-lg-3 col-md-4 col-sm-6 col-xs1-8 col-xs-12">
                {
                    Object.keys(movie).length &&
                        <div className="item">
                           <Link data-tip data-for="main-movie" className="poster" to={"/movie/" + movie["doc_id"]}>
                             <img src={movie["movie_poster"]} alt={movie["movie_title"]}/>
                             <span className="name">{movie["movie_title"]}</span>
                           </Link>
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
                              <Link data-tip data-for={"item" + index} className="poster" to={"/movie/" + item["doc_id"]}>
                                <img src={item["movie_poster"]} alt={item["movie_title"]}/>
                                <span className="name">{item["movie_title"]}</span>
                              </Link>
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

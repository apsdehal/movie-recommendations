import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';
import constants from "./constants";
import Thumbnail from "./components/Thumbnail";
import Header from "./components/Header";
import Search from "./components/Search";
import { Panel } from "react-bootstrap";

class Movie extends Component {
  constructor(props) {
      super(props);
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
    let movie = this.state.movie || {};
    return (
      <div className="Home">
        <Header></Header>
        <div className="Home-intro container">
            <Search handler={this.setState.bind(this)}></Search>
            <div className="row movie-list">
                {
                    Object.keys(movie).length &&
                    <Thumbnail item={movie} index={-1}></Thumbnail>
                }
            </div>
            <Panel header={"Recommendations"} bsStyle="success">
              <div className="row movie-list">
              {

                  this.state.items.length && this.state.items.map((item, index) => {

                      if (item["_id"] === movie["_id"]) {
                          return false;
                      } else {
                        return <Thumbnail item={item} key={index} index={index}></Thumbnail>
                      }
                  })
              }
              </div>
            </Panel>
         </div>
       </div>
    );
  }
}

export default Movie;

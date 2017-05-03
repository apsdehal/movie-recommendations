import React, { Component } from 'react';
import '../public/libs/bootstrap/css/bootstrap.min.css';
import '../public/libs/bootstrap/css/bootstrap-theme.min.css';
import './Home.css';
import Thumbnail from "./components/Thumbnail";
import Header from "./components/Header";
import Search from "./components/Search";


class Home extends Component {
  constructor() {
    super();
    this.state = { items: [] };
    this.vars = {
      search_type: 'actor_names',
      query: ''
    };
  }

  render() {
    return (
      <div className="Home">
        <Header></Header>
        <div className="Home-intro container">
            <Search handler={this.setState.bind(this)}></Search>
            <div className="row movie-list">
            {

                this.state.items.map((item, index) => {
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

import { Popover, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router';
import React from 'react';


const Thumbnail = (props) => {
    let item = props.item;
    const info = (
        <Popover id={"movie_hover_popover_" + props.index} title={item["movie_title"]}>
            <div><b>Actor:</b> {item["actor_names"][0]}, {item["actor_names"][1]}</div>
            <div><b>Director:</b> {item["director_name"]}</div>
            <div><b>IMDB Score:</b> {item["imdb_score"] + "/10"}</div>
            <div><b>Plot:</b> {item["movie_plot"]}</div>
        </Popover>
    )
    return (
        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={info}>
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs1-8 col-xs-12">
               <div className="item">
                  <Link className="poster" to={"/movie/" + item["doc_id"]}>
                    <img src={item["movie_poster"]} alt={item["movie_title"]}/>
                    <span className="name">{item["movie_title"]}</span>
                  </Link>
               </div>
            </div>
        </OverlayTrigger>
    )
}

export default Thumbnail;

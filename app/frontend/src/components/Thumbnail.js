import { Popover, OverlayTrigger, Image } from 'react-bootstrap';
import { Link } from 'react-router';
import React from 'react';


const Thumbnail = (props) => {
    let item = props.item;
    let source = item['_source'];
    const info = (
        <Popover id={"movie_hover_popover_" + props.index} title={source["movie_title"]}>
            <div><b>Actor:</b> {source["actor_names"][0]}, {source["actor_names"][1]}</div>
            <div><b>Director:</b> {source["director_name"]}</div>
            <div><b>Genres:</b> {source["genres"].join(", ")}</div>
            <div><b>IMDB Score:</b> {source["imdb_score"] + "/10"}</div>
            <div><b>Plot:</b> {source["movie_plot"]}</div>
        </Popover>
    )
    return (
        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={info}>
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs1-8 col-xs-12">
               <div className="item">
                  <Link className="poster" to={"/movie/" + item["_id"]}>
                    <Image responsive rounded src={source["movie_poster"]} alt={source["movie_title"]}/>
                    <span className="name">{source["movie_title"]}</span>
                  </Link>
               </div>
            </div>
        </OverlayTrigger>
    )
}

export default Thumbnail;

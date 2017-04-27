import config from "../../../config.json"

let constants = {
    baseUrl: config["server_url"] + ":" + config["server_port"],
    omdbLink: config["omdb_link"]
};

export default constants;

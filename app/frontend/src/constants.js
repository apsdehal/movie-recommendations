import config from "../../../config.json"

let genres = [
  "Comedy",
  "Sport",
  "History",
  "Drama",
  "Fantasy",
  "News",
  "Horror",
  "Action",
  "Mystery",
  "Music",
  "Crime",
  "Film-Noir",
  "Romance",
  "Western",
  "Animation",
  "Game-Show",
  "Family",
  "Sci-Fi",
  "Documentary",
  "Short",
  "Biography",
  "War",
  "Adventure",
  "Thriller",
  "Reality-TV",
  "Musical",
];

let constants = {
    baseUrl: config["server_url"] + ":" + config["server_port"],
    omdbLink: config["omdb_link"],
    genres: genres
};

export default constants;

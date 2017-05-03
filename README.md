# Movie Recommendation System

Movie recommendation system is a demo application made for purpose of demonstrating the use cases of [Structured Query Engine](https://github.com/apsdehal/strucutured-query-engine). User can search for a movie using various filters provided and select a movie from search results to get recommended similar results.

## Installation
- Recommended versions: `Python >= 3.5.2` and `Node >= 6.0.0`
- Copy `sample.config.json` to `config.json`
- Use `pip install -r requirements.txt` to install python dependencies
- `cd app/frontend && npm install`

## Running
- Edit `config.json`'s field according to conveinence. `query_engine_url` is to be set to url of structured query engine
- In the root folder, to get the `movie_metadata.csv` do `wget -O movie_metadata.csv https://goo.gl/YRj8dV`
- Run the structured query engine
- Feed the structured query engine using `python -m scripts.test_query_engine`


### Running: Production build
- From root folder `cd app/frontend` and do `npm run build`. This will generate a production build ready to be used.
- Run the backend using `python start.py`
- Go to `config_server_url:config_server_port` to see the app in action.

### Running: Development build
- Run the backend using `python start.py`
- From root folder `cd app/frontend` and do `npm start`. This will open a page on `localhost:3000` which will hot reloaded whenever a change is made to frontend files.

> Note: You can use [NVM](http://github.com/creationix/nvm) to install versions of node.

## Features
- Built using ReactJS, React Router, React Bootstrap and Tornado Web Framework
- Single page application
- Use axios promise based AJAX requests for backend communication.

## Architecture

![Architecture](http://i.imgur.com/nMSfoMM.png)

Search controller handles multi filter search requests from frontend and Recommendation controller handles gathering recommendations for a particular movie from Structured Query Engine.

## Screenshot
![Screenshot](http://i.imgur.com/cDtK5Zz.png)

## Authors
Amanpreet Singh @apsdehal
Karthik Venkatesan @gamemaker007
Simranjyot Singh Gill @simranjyotgill

## Credits

We will like to thank our Search Engine Architecture's professor Matt Doherty.

## License

Apache License V2

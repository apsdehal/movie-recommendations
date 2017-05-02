import tornado.web
import tornado.gen
import tornado.httpclient
import json
import requests

from config import config
from app.models.RecommendationModel import RecommendationModel


class RecommendationController(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')

    def options(self):
        # no body
        self.set_status(204)
        self.finish()

    def initialize(self):
        settings = {
            "url": config['query_engine_url'],
            "index": config['index_name'],
            "type": config['type_name']
        }
        self.recommendation_model = RecommendationModel(settings)

    @tornado.gen.coroutine
    def get(self, id):
        doc = self.recommendation_model.getItemFromId(id)
        if doc is not False:
            doc = json.loads(doc.decode("utf-8"))['_source']
            director_name = doc.get('director_name', None)
            plot_keywords = doc.get('plot_keywords', None)
            actor_names = doc.get('actor_names', None)
            genres = doc.get('genres', None)
            movie_title = doc.get('movie_title', None)
            items = self.recommendation_model.searchFields(movie_title, director_name,
                plot_keywords, actor_names, genres)
            if items is not False:
                items = json.loads(items.decode("utf-8"))
            else:
                items = {'hits': []}
        else:
            items = {'hits': []}
        # print(items)
        self.write(json.dumps(items['hits']))

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
        items = self.recommendation_model.getItemFromId(id)
        if items is not False:
            items = json.loads(items.decode("utf-8"))
            director_name = items.get('director_name', None)
            plot_keywords = items.get('plot_keywords', None)
            actor_names = items.get('actor_names', None)
            genres = items.get('genres', None)
            items = self.recommendation_model.searchFields(director_name,
                plot_keywords, actor_names, genres)
            if items is not False:
                items = json.loads(items.decode("utf-8"))
                items = items['hits']
            else:
                items = {'hits': []}
        else:
            items = {'hits': []}
        self.write(json.dumps(items['hits']))

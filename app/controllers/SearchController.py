import tornado.web
import tornado.gen
import tornado.httpclient
import json

from config import config
from app.models.QueryModel import QueryModel


class SearchController(tornado.web.RequestHandler):
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
        self.search_url = "%s:%s/%s" % (config["server_url"], config["server_port"], "search")
        self.query_model = QueryModel(settings)

    @tornado.gen.coroutine
    def post(self):
        body = json.loads(self.request.body.decode('utf-8'))
        search_type = body.get('search_type', "")
        query = body.get('query', "")
        genres = body.get('genres', "")
        imdb_score = body.get('imdb_score', "")
        items = self.query_model.searchField(search_type, query, genres, imdb_score)
        if items is not False:
            items = json.loads(items.decode("utf-8"))
            items = items['hits']
        else:
            items = {'hits': []}
        self.write(json.dumps(items['hits']))

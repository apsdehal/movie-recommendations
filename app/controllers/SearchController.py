import tornado.web
import tornado.gen
import tornado.httpclient
import json

from config import config
from app.models.QueryModel import QueryModel


class SearchController(tornado.web.RequestHandler):
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
        search_type = self.get_body_argument('search_type')
        query = self.get_body_argument('query')
        items = self.query_model.searchField(search_type, query)
        if items is not False:
            items = json.loads(items)
            items = items['hits']
        else:
            items = {'hits': []}
        self.render("../views/index.html", url=self.search_url, items=items['hits'])

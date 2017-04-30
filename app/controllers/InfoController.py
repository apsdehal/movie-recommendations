import tornado.web
import tornado.gen
import tornado.httpclient
import requests
from config import config


class InfoController(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def initialize(self):
        settings = {
            "url": config['query_engine_url'],
            "index": config['index_name'],
            "type": config['type_name']
        }

        self.url = "%s/%s/%s" % (settings['url'], settings['index'], settings['type'])

    @tornado.gen.coroutine
    def get(self, id):
        response = requests.get(self.url + "/" + id)
        self.write(response.content)

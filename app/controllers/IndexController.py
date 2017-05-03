import tornado.web
import tornado.gen
import tornado.httpclient
from config import config


class IndexController(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def initialize(self):
        self.url = "%s:%s/%s" % (config["server_url"], config["server_port"], "search")

    @tornado.gen.coroutine
    def get(self, id=None):
        if config["build_exists"]:
            self.render("../frontend/build/index.html")
        else:
            self.render("../views/index.html", url=self.url, items=[])

import tornado.web
import tornado.gen
import tornado.httpclient
from config import config


class IndexController(tornado.web.RequestHandler):
    def initialize(self):
        self.url = "%s:%s/%s" % (config["server_url"], config["server_port"], "search")

    @tornado.gen.coroutine
    def get(self):
        self.render("../views/index.html", url=self.url, items=[])

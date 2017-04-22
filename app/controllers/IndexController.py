import tornado.web
import tornado.gen
import tornado.httpclient


class IndexController(tornado.web.RequestHandler):

    @tornado.gen.coroutine
    def get(self):
        self.render("../views/index.html")

import tornado.web
import tornado.gen
import tornado.httpclient


class SearchController(tornado.web.RequestHandler):

    @tornado.gen.coroutine
    def get(self):
        self.render("app/views/index.html")

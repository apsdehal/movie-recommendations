from tornado.ioloop import IOLoop
from tornado import web, httpserver, process, netutil
from app.controllers.IndexController import IndexController
from app.controllers.SearchController import SearchController
from app.controllers.RecommendationController import RecommendationController
from config import config

import logging

log = logging.getLogger(__name__)


def main():
    SERVER_PORT = config["server_port"]

    socket = netutil.bind_sockets(SERVER_PORT)
    task_id = process.fork_processes(0)

    application = web.Application([
        (r"/", IndexController),
        (r"/search", SearchController),
        (r"/recommend", RecommendationController),
    ])

    http_server = httpserver.HTTPServer(application)
    http_server.add_sockets(socket)
    log.info("Worker listening on %d", SERVER_PORT)
    IOLoop.current().start()


if __name__ == '__main__':
    logging.basicConfig(format='%(levelname)s - %(asctime)s - %(message)s',
                        level=logging.DEBUG)
    main()

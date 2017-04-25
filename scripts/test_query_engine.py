from scripts.generate_index import createIndexIfNotExists, createAndFeedIndexWithDocs
from tornado.ioloop import IOLoop

createAndFeedIndexWithDocs(True)
IOLoop.current().start()

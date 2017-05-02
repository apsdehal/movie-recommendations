from config import config
from scripts.csv_parser import get_all_from_csv
import requests
from tornado import httpclient, gen, ioloop
import json


# Return boolean if index was newly created
def createIndexIfNotExists():
    # Check if index exists
    # If not create index here
    query_url = "%s/%s" % (config["query_engine_url"], config["index_name"])
    r = requests.head(query_url)

    if r.status_code == 200:
        return False

    mapping = open(config["mapping_path"], 'r')
    settings = {}
    settings["number_of_shards"] = config['num_shards']

    payload = {}
    payload['mappings'] = json.load(mapping)
    payload['settings'] = settings
    r = requests.put(query_url, data=json.dumps(payload))

    return r.status_code == 200


# TODO Revert back to continuous

@gen.coroutine
# Call only if index doesn't already exists
def createAndFeedIndexWithDocs(feed_anyway=False):
    # See if bulk index option is there
    # or feed docs one by one
    # Checks if index exists if not creates it and feeds

    if createIndexIfNotExists() or feed_anyway:
        query_url = "%s/%s/%s" % (config["query_engine_url"], config["index_name"], config["type_name"])

        docs = get_all_from_csv()
        http = httpclient.AsyncHTTPClient()

        futures = []
        count = 0
        i = 0
        for doc in docs:
            payload = doc
            futures.append(http.fetch(query_url + "/" + str(i), method="PUT", body=json.dumps(payload).strip()))
            i += 1
            count += 1
            if count == 10:
                yield futures
                futures = []
                count = 0
        ioloop.IOLoop.instance().stop()

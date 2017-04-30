import requests
import json

from config import config


class QueryModel:
    def __init__(self, settings):
        self.url = "%s/%s/%s/_search" % (settings['url'], settings['index'], settings['type'])

    def searchField(self, field, query, genres):
        payload = {}
        payload["query"] = {"bool": {"should": []}}
        payload["query"]["bool"]["should"].append({"match": {field: query}})

        if len(genres):
            genres = genres.split(",")

            if len(genres):
                for genre in genres:
                    payload["query"]["bool"]["should"].append({"match": {"genres": genre}})

        print(self.url, payload)
        r = requests.get(self.url, data=json.dumps(payload))
        if r.status_code == 200:
            return r.content
        else:
            return False

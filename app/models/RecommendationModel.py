import requests
import json

from config import config


class RecommendationModel:
    def __init__(self, settings):
        self.min_imdb_score = 0
        self.url = "%s/%s/%s" % (settings['url'], settings['index'], settings['type'])
        self.search_url = "%s/_search" % self.url

    def getItemFromId(self, id):
        self.url = '/'.join([self.url, id])
        r = requests.get(self.url)
        if r.status_code == 200:
            return r.content
        else:
            return False

    def searchFields(self, director_name, plot_keywords, actor_names, genres):
        payload = {}
        should_query = []

        if director_name:
            query = {"match": {"director_name": director_name}}
            should_query.append(query)
        if plot_keywords:
            for keyword in plot_keywords:
                query = {"match": {"plot_keywords": keyword}}
                should_query.append(query)
        if actor_names:
            for actor in actor_names:
                query = {"match": {"actor_names": actor}}
                should_query.append(query)
        if genres:
            for genre in genres:
                query = {"match": {"genres": genre}}
                should_query.append(query)

        range_query = {"range": {"imdb_score": {"gte": self.min_imdb_score}}}

        payload["query"] = {'bool': {'should': should_query, 'filter': range_query}}
        # print(self.search_url,payload)
        r = requests.get(self.search_url, data=json.dumps(payload))
        if r.status_code == 200:
            return r.content
        else:
            return False

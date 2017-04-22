from config import config
import requests
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


# Call only if index doesn't already exists
def feedIndexWithDocs():
    # See if bulk index option is there
    # or feed docs one by one
    return

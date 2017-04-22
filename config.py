import json
import os

configName = os.path.dirname(os.path.realpath(__file__)) + '/config.json'
config = None
try:
    with open(configName) as data:
        try:
            config = json.load(data)
        except Exception:
            print("Error occured while parsing json, please check json validity")
except Exception:
    print("Error occured while reading config, make sure config.json is present")
    raise

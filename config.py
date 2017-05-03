import json
import os

configName = os.path.dirname(os.path.realpath(__file__)) + '/config.json'
config = None
try:
    with open(configName) as data:
        try:
            config = json.load(data)
            config["build_exists"] = os.path.join(os.path.dirname(configName), "app", "frontend", "build")
            config["build_exists"] = os.path.exists(config["build_exists"])
        except Exception:
            print("Error occured while parsing json, please check json validity")
except Exception:
    print("Error occured while reading config, make sure config.json is present")
    raise

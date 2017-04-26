import csv
from config import config
import requests
import json
import time
"""
####### keys for reading csv #######
####### color
####### director_name
####### num_critic_for_reviews
####### duration
####### director_facebook_likes
####### actor_3_facebook_likes
####### actor_2_name
####### actor_1_facebook_likes
####### gross
####### genres
####### actor_1_name
####### movie_title
####### num_voted_users
####### cast_total_facebook_likes
####### actor_3_name
####### facenumber_in_poster
####### plot_keywords
####### movie_imdb_link
####### num_user_for_reviews
####### language
####### country
####### content_rating
####### budget
####### title_year
####### actor_2_facebook_likes
####### imdb_score
####### aspect_ratio
####### movie_facebook_likes
####### movie_plot
"""


def generatePlot():
    PLOT_KEY = 'movie_plot'
    POSTER_KEY = 'movie_poster'

    with open(config['csv_path']) as csvfile:
        movie_metadata = csv.DictReader(csvfile)
        fieldnames = movie_metadata.fieldnames + [PLOT_KEY, POSTER_KEY]
        result = []
        sleep_secs = 2

        for row in movie_metadata:
            imdb_id = row['movie_imdb_link'].split('/')[4]
            url = "http://www.omdbapi.com/?i="+imdb_id
            response = requests.get(url)

            while response.status_code != requests.codes.ok:
                time.sleep(sleep_secs)
                response = requests.get(url)

            response = json.loads(response.text)

            plot = response.get('Plot','')
            poster = response.get('Poster','')
            row[PLOT_KEY] = plot
            row[POSTER_KEY] = poster

            result.append(row)

    if config['csv_path'].endswith('.csv'):
        new_csv_path = config['csv_path'][:-4]+'_new.csv'

    with open(new_csv_path, 'w') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for row in result:
            writer.writerow(row)


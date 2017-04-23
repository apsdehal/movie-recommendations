import csv
from config import config
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
"""


def get_all_from_csv():
    with open(config['csv_path']) as csvfile:
        movie_metadata = csv.DictReader(csvfile)
        result = []
        for row in movie_metadata:
            row['genres'] = row['genres'].split('|')
            row['plot_keywords'] = row['plot_keywords'].split('|')

            # combining actor_1_name, actor_2_name and actor_3_name
            # to a single list with key actor_names
            actors = []
            actors.append(row['actor_1_name'])
            actors.append(row['actor_2_name'])
            actors.append(row['actor_3_name'])
            row['actor_names'] = actors

            # removing unnecessary keys from dict
            row.pop('num_critic_for_reviews', None)
            row.pop('director_facebook_likes', None)
            row.pop('actor_1_name')
            row.pop('actor_2_name')
            row.pop('actor_3_name')
            row.pop('actor_1_facebook_likes', None)
            row.pop('actor_2_facebook_likes', None)
            row.pop('actor_3_facebook_likes', None)
            row.pop('gross', None)
            row.pop('cast_total_facebook_likes', None)
            row.pop('content_rating', None)
            row.pop('num_user_for_reviews', None)
            row.pop('budget', None)
            row.pop('movie_facebook_likes', None)

            result.append(row)

    return result

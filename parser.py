import csv

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

with open('movie_metadata.csv') as csvfile:
    movie_metadata = csv.DictReader(csvfile)
    for row in movie_metadata:
        row['genres'] = row['genres'].split('|')
        row['plot_keywords'] = row['plot_keywords'].split('|')

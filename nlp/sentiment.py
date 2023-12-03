import nltk
import csv
import sys
import random
from nltk.sentiment import SentimentIntensityAnalyzer

# download VADER
nltk.download('vader_lexicon')

# nltk VADER is a lexicon that we can use without training
sia = SentimentIntensityAnalyzer()

# workaround to let us use big files :(
csv.field_size_limit(sys.maxsize)
# this is where you read the articles' abstracts
news_articles = []
with open('articles-abstracts.csv', newline='') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        news_articles.append(row[0])

# randomly shuffly array so first x are different every time
random.shuffle(news_articles)

# print(news_articles[:3])

# sentiment analysis stuff
for article in news_articles[:3]:  # change the 3 to however many articles you want to analyze
    sentiment_scores = sia.polarity_scores(article)
    print(f"Article: '{article}'")
    print(f"Sentiment Scores: {sentiment_scores}")
    # determine the sentiment based on compound score
    if sentiment_scores['compound'] >= 0.05:
        print("Sentiment: Positive")
    elif sentiment_scores['compound'] <= -0.05:
        print("Sentiment: Negative")
    else:
        print("Sentiment: Neutral")
    print("-------------------------------------------")

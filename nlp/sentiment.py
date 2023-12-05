import nltk
import csv
import sys
import random
import pandas as pd
from nltk.sentiment import SentimentIntensityAnalyzer

# download VADER
nltk.download('vader_lexicon')

# nltk VADER is a lexicon that we can use without training
sia = SentimentIntensityAnalyzer()

# workaround to let us use big files :(
csv.field_size_limit(sys.maxsize)
# this is where you read the articles' abstracts
news_articles = []
with open('nyt-metadata-ready.csv', newline='', mode='r') as csvfile:
    reader = csv.reader(csvfile)
    rows = list(reader)

def calculate_new_column_value(row):
    sentiment_score = sia.polarity_scores(row[1])
    if sentiment_score:
        # determine sentiment based on compound score
        if sentiment_score['compound'] >= 0.05:
            return "Sentiment: Positive"
        elif sentiment_score['compound'] <= -0.05:
            return "Sentiment: Negative"
        else:
            return "Sentiment: Neutral"
  
header_row = rows[0]
header_row.append('Sentiment')

for row in rows[1:]:
    new_val = calculate_new_column_value(row)
    row.append(new_val)

with open('nyt-metadata-ready.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(rows)

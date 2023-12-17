import sys
import csv
import pprint

csv.field_size_limit(sys.maxsize)

d = {}

looking_at = ['New York', 'Arts', 'Sports', 'World',
              'Business Day', 'Opinion', 'Science', 'U.S.',
              'Books', 'Food', 'Technology', 'Health', 'Travel']

file = open("nyt-sentiment.csv", "r")
reader = csv.reader(file)
for line in reader:
    if line[7] in looking_at:
        year = line[9]
        category = line[7]
        sentiment = line[10]

        if year not in d:
            d[year] = {}

        if category not in d[year]:
            d[year][category] = {'Sentiment: Positive': 0,
                                 'Sentiment: Negative': 0,
                                 'Sentiment: Neutral': 0,
                                 'Total': 0}

        if sentiment == 'Sentiment: Positive':
            d[year][category]['Sentiment: Positive'] += 1
        elif sentiment == 'Sentiment: Negative':
            d[year][category]['Sentiment: Negative'] += 1
        elif sentiment == 'Sentiment: Neutral':
            d[year][category]['Sentiment: Neutral'] += 1

        d[year][category]['Total'] += 1

csv_file_name = 'sentiment_percentage.csv'

rows = []
for year, categories in d.items():
    for category, sentiments in categories.items():
        total_sentiments = sentiments['Sentiment: Positive'] + \
            sentiments['Sentiment: Negative'] + \
            sentiments['Sentiment: Neutral']
        row = {
            'Year': year,
            'Category': category,
            'Percentage: Positive': (sentiments['Sentiment: Positive'] / total_sentiments) * 100,
            'Percentage: Negative': (sentiments['Sentiment: Negative'] / total_sentiments) * 100,
            'Percentage: Neutral': (sentiments['Sentiment: Neutral'] / total_sentiments) * 100,
            'Count: Positive': sentiments['Sentiment: Positive'],
            'Count: Negative': sentiments['Sentiment: Negative'],
            'Count: Neutral': sentiments['Sentiment: Neutral'],
            'Total': sentiments['Total']
        }
        rows.append(row)

headers = ['Year', 'Category',
           'Percentage: Positive', 'Percentage: Negative', 'Percentage: Neutral',
           'Count: Positive', 'Count: Negative', 'Count: Neutral',
           'Total']

with open(csv_file_name, 'w', newline='') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=headers)
    writer.writeheader()
    writer.writerows(rows)

print(f"Created '{csv_file_name}'")

import pandas as pd
import re
import collections
 # *** Make take a few minutes to run this script ***

# Replace 'your_file.csv' with the path to your CSV file
file_path = 'nyt-metadata-keywords.csv'

# Read the CSV file into a DataFrame
df = pd.read_csv(file_path)

# Create a dictionary to store keyword counts for each year
yearly_keyword_counts = {}

# Loop over the years from 2000 to 2011
for year in range(2000, 2012):
    # Initialize a dictionary for the current year
    year_dict = {}
    
    for index, row in df.iterrows():
        keywords = row['keywords']
        row_year = row['Year']
        
        if row_year == year:
            matches = re.findall(r"'value': '(.*?)'", keywords)
            for match in matches:
                if match not in year_dict:
                    year_dict[match] = 1
                else:
                    year_dict[match] += 1

    # Store the yearly keyword counts in the dictionary
    yearly_keyword_counts[year] = year_dict

# Print the top 10 keywords for each year
for year, year_dict in yearly_keyword_counts.items():
    keyword_counts = collections.Counter(year_dict)
    top_10_keywords = keyword_counts.most_common(10)
    print(f"Year: {year}")
    for keyword, count in top_10_keywords:
        print(f"  Keyword: {keyword}, Count: {count}")
    print('-----')

# Print the shape of the DataFrame
print(df.shape)
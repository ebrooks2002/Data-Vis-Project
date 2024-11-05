import pandas as pd
import re
import collections

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

# Calculate the percentage growth for each keyword from the previous year
for year in range(2001, 2012):
    prev_year = year - 1
    current_year_keywords = yearly_keyword_counts[year]
    prev_year_keywords = yearly_keyword_counts[prev_year]
    
    if current_year_keywords and prev_year_keywords:
        for keyword in current_year_keywords:
            if keyword in prev_year_keywords:
                current_count = current_year_keywords[keyword]
                prev_count = prev_year_keywords[keyword]
                if prev_count != 0:  # Check if prev_count is not zero
                    growth_percentage = ((current_count - prev_count) / prev_count) * 100
                else:
                    growth_percentage = 0
                
# Sort the keywords by percentage growth and get the top 10
    top_10_keywords = dict(sorted(current_year_keywords.items(), key=lambda item: item[1], reverse=True)[:10])
    

    print(f"Year: {year}")
    for keyword, growth_percentage in top_10_keywords.items():
        print(f"  Keyword: {keyword}, Growth Percentage: {growth_percentage:.2f}%")
    print('-----')



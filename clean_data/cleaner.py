import pandas as pd
import re
# Replace 'your_file.csv' with the path to your CSV file
file_path = 'nyt-metadata-keywords.csv'
# Columns to delete: abstrac, web_url, snippet, lead_paragraph, print_section, print_page, source
# headline, document_type, news_desk, section_name, byline, type_of_material, word_count


# Read the CSV file into a DataFrame
df = pd.read_csv(file_path)


# Let's create a dictionary containing all keywords
keyword_dict ={}

dict2000 = {}
dict2001 = {}
dict2002 = {}
dict2003 = {}
dict2004 = {}
dict2005 = {}
dict2006 = {}
dict2007 = {}
dict2008 = {}
dict2009 = {}
dict2010 = {}
dict2011 = {}

for value in df['keywords']:
    matches = re.findall(r"'value': '(.*?)'", value)
    for match in matches:
        if match not in keyword_dict:
            keyword_dict[match] = 1
        else: 
            keyword_dict[match] += 1
    
print(keyword_dict)

# Print the extracted substrings
print(df.shape)

#df.to_csv("nyt-metadata-keywords1.csv")

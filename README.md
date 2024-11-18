# COMP 435 Data Visualization Final Project

### Visit the Website:
[Interactive Article](https://ebrooks2002.github.io/Data-Vis-Project/)

---

## Project Motivation
The New York Times (NYT) is the second-largest grossing news source in the U.S. and a highly regarded news source globally. It serves as a rich source for analyzing media trends and journalistic evolution in the 21st century. Our project aims to uncover trends in editorial focus, topic prominence, and article sentiment, through a series of visualizations. Utilizing a treemap, we show the distribution of articles across various NYT sections annually, identifying which sections dominate over time. The word cloud highlights the most frequently used keywords each year, summarizing what the hottest topics were in the recent past. Through a line chart, we track sentiment trends across different sections, revealing whether the tone of coverage becomes more positive, negative, or neutral in response to significant events. Last, the stacked bar chart breaks down sentiment categories within each section for selected years, showing how sections differ in tone. 

---

## Dataset & Processing

Using a dataset of NYT articles from 2000 to 2023, we analyze trends in sentiment, topics, and keywords. The dataset fields include:

- **abstract**
- **web URL**
- **headline**
- **keywords**
- **publication date**
- **news desk**
- **section name**
- **byline**
- **word count**

**Deleted:**
- Rows with null values.
- Articles with fewer than 50 words.
- Rows where the `document_type` was not "article."
- Articles from categories unrelated to our project, such as archives and obituaries.
- Unnecessary columns like `byline`, `headline`, and `news desk`.

**New Calculations:**

1. **Sentiment Analysis**: Each article's sentiment was calculated as positive, neutral, or negative. Example code snippet:
   ```python
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
   ```

2. **Keyword Growth Table**: We created a table (3x100) showing keywords with the largest increase in usage frequency from 2001 to 2011. Below is an example of the first two rows:
   | Year          | Keyword        | Growth Percentage |
   |---------------|----------------|-------------------|
   | 2001          | New York City  | 13,248           |
   | 2001          | Terrorism      | 9,391            |

   Growth percentages were calculated by comparing keyword frequencies year-over-year:
   ```python
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

       # Sort keywords by growth percentage and select the top 10
       top_10_keywords = dict(sorted(current_year_keywords.items(), key=lambda item: item[1], reverse=True)[:10])
   ```

---

## Visualizations Using D3.js

### 1. Keyword Frequency
To visualize changes in keyword frequency over time, we created an interactive word cloud where the word size represents the year-over-year percentage change. The top 10 keywords with the highest jumps are displayed. 

<img width="603" alt="Screen Shot 2024-11-18 at 12 47 34 PM" src="https://github.com/user-attachments/assets/e0e75d49-4b80-4cf6-a568-f19280607f62">

### 2. Topic Popularity
Next, we examine changes in topic popularity over time. Each NYTs article belongs to a specific category, which allows us to use a stacked line chart to show category trends. Users can explore how the average number of "Sports" or "Politics" articles published annually has changed since 2000.

<img width="654" alt="Screen Shot 2024-11-18 at 12 51 12 PM" src="https://github.com/user-attachments/assets/8de0188b-c15e-4ad0-acd8-ba0140c1e13b">

### 3. Sentiment Analysis
Finally, we performed sentiment analysis on each article's abstract, categorizing them as positive, negative, or neutral. This analysis helps us answer questions such as: Does the overall tone of NYT articles shift in response to positive or negative current events?

#### Sentiment Differences Across Topics:

<img width="634" alt="Screen Shot 2024-11-18 at 12 52 12 PM" src="https://github.com/user-attachments/assets/0066f75b-e2bb-4d10-b01a-adbe09d09178">

#### Sentiment Changes Over Time:

<img width="756" alt="Screen Shot 2024-11-18 at 12 53 21 PM" src="https://github.com/user-attachments/assets/10971089-0d4b-47c4-9990-6c62f2fad7ab">

--- 

This project provides a unique lens to examine how the NYT reflects and potentially influences cultural and societal shifts. 

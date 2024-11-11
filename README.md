# COMP 435 Data Visualization Final Project

### Visit the Project
[Data-Vis-Project on GitHub Pages](https://ebrooks2002.github.io/Data-Vis-Project/)

---

## Project Motivation
The New York Times (NYT) is the second-largest grossing news source in the United States and one of the most highly regarded news organizations globally. News has a unique relationship with the consumer—it both defines and follows societal trends. For example, consider the current Israel and Palestine conflict. Without news, this conflict would not be as widely discussed by the public and behind closed federal doors the way it is today. In other cases, certain topics remain relevant only due to ongoing media coverage, such as social identities like the Kardashians, which stay in the public eye largely through continued interest in the news. By analyzing patterns in NYT articles, we can gain insight into societal shifts, cultural changes, and how media and journalism have evolved through the 21st century.

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
To visualize changes in keyword frequency over time, we created an interactive bubble diagram where the bubble size represents the year-over-year percentage change. The top 10 keywords with the highest jumps are displayed. For instance, users can see how the keyword "Iran" changes in frequency between 2002 and 2003.

![Keyword Frequency Visualization](https://github.com/user-attachments/assets/364b4f95-9228-40be-963c-d746a17a767c)

### 2. Topic Popularity
Next, we examine changes in topic popularity over time. Each NYT article belongs to a specific category, which allows us to use a stacked line chart to show category trends. Users can explore how the average number of "Sports" or "Politics" articles published annually has changed since 2000

![Topic Popularity Visualization](https://github.com/user-attachments/assets/19539bc8-5514-4822-b75a-deb701df5d48)

### 3. Sentiment Analysis
Finally, we performed sentiment analysis on each article's abstract, categorizing them as positive, negative, or neutral. This analysis helps us answer questions such as: Does the overall tone of NYT articles shift in response to positive or negative current events?

#### Sentiment Changes Over Time:
![Sentiment Over Time](https://github.com/user-attachments/assets/f62da9b8-cb7d-4b61-a5bd-d9e3e7cef0a8)

#### Sentiment Differences Across Topics:
![Sentiment by Topic](https://github.com/user-attachments/assets/09da3c19-9d6c-411f-a8b5-11e764159c7b)

--- 

This project provides a unique lens to examine how the NYT reflects and potentially influences cultural and societal shifts. 

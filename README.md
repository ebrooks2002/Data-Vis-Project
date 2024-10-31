# COMP 435 Data Visualization Final Project

To see our project, visit: https://ebrooks2002.github.io/Data-Vis-Project/

# Project Motivation:
The New York Times is the second largest grossing news source in the United States while being one of the most highly regarded and recognized news organizations in the world. News has an interesting relationship to the consumer where it both defines and follows trends in society. Take for example the current Israel and Palestine conflict. Without news, the war would not be discussed by the general public and behind the closed doors of the federal governemnt the way it is currently. On the other hand, some things only remain relevant because of news coverage; social identities like the Kardashians only remain relevant because of continued public interest in the subject. Identifying patterns in NYT articles can provide insight into societal shifts and cultural changes over time. It can also provide insight into how media and journalism has developed through the 21st century.

# About the Project: 
Using a dataset of NYT articles spanning from 2000-2023, we identify trends in sentiment, article topics, and keywords. The features of the fields in the dataset include: abstract, Web URL, headline, keywords, pub date, news desk, section name, byline, and word count. 

<img width="1083" alt="Screen Shot 2024-10-31 at 4 10 37 PM" src="https://github.com/user-attachments/assets/f46364d7-901c-419d-86be-ef5b57ab22d4">

We first focus on keyword frequency. To visualize the changes in frequency of keywords over the years, we’ll create an interactive bubble diagram where size of the bubble represents the percent change in frequency from the previous year. The top 10 biggest jumps will be shown in the diagram. One could learn how the keyword 'Iran' changes in frequency between 2002 and 2003. 

Next, we identify changes in the popularity of certain topics over time. Every NYT article is placed within a certain category, so we will use an interactive stacked line chart to show how these categories change. For example, a user may inquire into how on average, the number of Sports articles published in a given month changes since 2000. Or how the annual number of published articles within the Politics category changes over the course of 4 years. 

Lastly, we run sentiment analysis on each article’s abstract, assigning the article one of three tones: positive, negative or neutral. This will help us answer the question: Can we see the overall tone of NYT articles change according to the positivity of current events? 

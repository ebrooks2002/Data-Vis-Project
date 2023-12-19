# COMP 435 Data Visualization Final Project

# Reason for Choosing this Topic:
The New York Times is the second largest grossing news source in the United States while being one of the most highly regarded and recognized news organizations in the world. News has an interesting relationship to the consumer where it both defines and follows trends in society. Take for example the current Israel and Palestine conflict. Without news, the war would not be discussed as it is currently. On the other hand, social identities like the Kardashians only remain relevant because of continued public interest in the subject. Identifying patterns in NYT articles can provide insight into societal shifts and cultural changes over time. It can also provide insight into how media and journalism has developed through the 21st century.

# About the Project: 
Using a dataset of 2000-2023 NYT articles, we will identify trends over time in the articles. The features of the objects in the dataset include: abstract, Web URL, headline, keywords, pub date, news desk, section name, byline, and word count.  If possible, we also aim to use the NYT API to access an article’s number of comments and shares.

The first aspect of the articles we’d like to focus on are keywords. To visualize the changes in frequency of keywords over the years, we’ll create an interactive bubble diagram where size of the bubble represents the percent change in frequency from the previous year. The top 10 biggest jumps will be shown in the diagram. 

The second pattern we aim to identify is the popularity of certain topics over time. Every NYT article is placed within a certain category, so we will use an interactive stacked line chart to show how these categories change. For example, a user may inquire into how on average, the number of Sports articles published in a given month changes, on average since 2000. Or how the annual number of published articles within the Politics category changes over the course of 4 years on average. Compared to 2000, what percentage of total NYT articles were in the Middle East.

We also aim to run sentiment analysis on each article’s abstract, assigning the article one of three tones: positive, negative or neutral. This will help us answer: Can we see the overall tone of NYT articles change according to the positivity of current events? If time permits, do people prefer to comment on positive, negative or neutral articles?

To see our project go to: https://ebrooks2002.github.io/Data-Vis-Project/

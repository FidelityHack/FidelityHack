import pandas as pd
from sent import TwitterClient

# creating object of TwitterClient Class 
api = TwitterClient() 
df = pd.read_csv("Fidelity.csv", error_bad_lines=False)
company = df["Company A"].iloc[0]

print(company)

# calling function to get tweets 
tweets = api.get_tweets(query = company, count = 100) 

# picking positive tweets from tweets 
ptweets = [tweet for tweet in tweets if tweet['sentiment'] == 'positive'] 
# percentage of positive tweets 
print("Positive tweets percentage: {} %".format(round(100*len(ptweets)/len(tweets), 2))) 
# picking negative tweets from tweets 
ntweets = [tweet for tweet in tweets if tweet['sentiment'] == 'negative'] 
# percentage of negative tweets 
print("Negative tweets percentage: {} %".format(round(100*len(ntweets)/len(tweets),2))) 
# percentage of neutral tweets 
#print("Neutral tweets percentage: {} % ".format(100*len(tweets - ntweets - ptweets)/len(tweets) - 1)) 

# printing first 5 positive tweets 
print("\n\nPositive tweets:") 
for tweet in ptweets[:10]: 
    print(tweet['text']) 

# printing first 5 negative tweets 
print("\n\nNegative tweets:") 
for tweet in ntweets[:10]: 
    print(tweet['text']) 
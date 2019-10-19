import requests
from selenium import webdriver
from bs4 import BeautifulSoup
response = requests.get('https://www.fidelity.ca/fidca/en/priceandperformance?category=all')

soup = BeautifulSoup(response.text,'html.parser')
# print(soup.body)
el = soup.body.contents

print(el)
# funds = soup.find_all(class_ = 'fund')
# print(funds)

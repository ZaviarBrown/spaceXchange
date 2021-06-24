from flask import Blueprint
from bs4 import BeautifulSoup
import requests
import random

article_routes = Blueprint("article", __name__)


@article_routes.route("/")
def article():
    # list to be returned as tuples - (text, link)
    article_list = []

    # grabbing site and accessing content
    site = requests.get("https://www.reuters.com/markets")
    soup = BeautifulSoup(site.content, "html.parser")
    news = soup.find_all("article", class_="story")

    # generate random numbers for articles
    article_numbers = []
    while len(article_numbers) < 5:
        article_num = random.randint(1, 15)
        if article_num not in article_numbers:
            article_numbers.append(article_num)

    # grabbing articles from random numbers generated
    for num in article_numbers:
        article_list.append((news[num].h3.text.strip(), news[num].a.get("href")))

    article_dict = dict(article_list)
    # print(article_dict)
    return article_dict

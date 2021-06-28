from flask import Blueprint
from bs4 import BeautifulSoup
import requests
import random

article_routes = Blueprint("article", __name__)


@article_routes.route("/")
def article():
    url = "https://www.benzinga.com"
    site = requests.get("https://www.benzinga.com/news")
    soup = BeautifulSoup(site.content, "html5lib")
    news = soup.find_all("div", class_="listing-long-image")
    news2 = soup.find_all("div", class_="listing-long-content")
    #! THE ERROR MESSAGE
    # was loaded over HTTPS, but requested an insecure resource 'http://spacexchange.herokuapp.com/api/article/'. This request has been blocked; the content must be served over HTTPS.

    # source (is static)

    # title
    # news2[2].a.text

    # link
    # url2 + news2[2].a.get('href')

    # img
    # news[2].img['src']

    # time
    # splitDate = news2[2].find("span", class_="date").text.split()
    # f"{splitDate[1]} {splitDate[2]} {splitDate[0]} {splitDate[3]}"

    # article
    # news2[2].p.text.strip()

    articles = {}
    article = {}

    x = 0
    seenArticles = []
    while len(articles) < 3:
        article_num = random.randint(1, 3)
        splitDate = news2[article_num].find("span", class_="date").text.split()
        newArticle = "article" + (f"{x}")

        if article_num not in seenArticles:
            seenArticles.append(article_num)
            newArticle = {}
            newArticle["source"] = ["Benzinga"]
            newArticle["title"] = [news2[article_num].a.text]
            newArticle["link"] = [url + news[article_num].a.get("href")]
            newArticle["img"] = [news[article_num].img["src"]]
            newArticle["date"] = [
                f"{splitDate[1]} {splitDate[2]} {splitDate[0]} {splitDate[3]}"
            ]
            newArticle["article"] = [news2[article_num].p.text.strip()]

            articles[x] = newArticle
            x += 1
        else:
            continue

    return articles

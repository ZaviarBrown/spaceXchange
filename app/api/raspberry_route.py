from flask import Blueprint
import requests

URL = "http://71.172.19.94"

raspberry_route = Blueprint("raspberry", __name__)


@raspberry_route.route("/")
def raspberry():
    prices = requests.get(URL).json()
    return prices

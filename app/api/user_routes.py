from flask import Blueprint, jsonify
import datetime
from flask_login import login_required
from app.models import User
from localStoragePy import localStoragePy


user_routes = Blueprint("users", __name__)

start_data = [
    {"name": "9 days ago", "value": 481230.58},
    {"name": "8 days ago", "value": 491898.26},
    {"name": "7 days ago", "value": 96902.54},
    {"name": "6 days ago", "value": 96902.96},
    {"name": "5 days ago", "value": 94201.31},
    {"name": "4 days ago", "value": 439387.71},
    {"name": "3 days ago", "value": 439394.75},
    {"name": "2 days ago", "value": 439400.85},
    {"name": "1 days ago", "value": 319845.93},
]


@user_routes.route("/", methods=["GET", "PATCH"])
@login_required
def user_history():
    if localStorage.getItem("history") is None:
        localStorage.setItem("history", jsonify(start_data))

    else:
        print(request.json)
        history = localStorage.getItem("history")
        user_id = request.json["userId"]
        account_value = request.json
        history.pop(0)
        history.append({"name": f"${datetime.time}", "value": account_value})
        localStorage.setItem("history", jsonify(history))

    return "success"

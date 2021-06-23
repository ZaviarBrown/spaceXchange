from flask import Blueprint, jsonify
from flask.globals import request
from flask_login import login_required, current_user
from app.models import db, Asset, transaction


asset_routes = Blueprint("assets", __name__)


@asset_routes.route("/")
@login_required
def assets():
    assets = Asset.query.filter(Asset.userId == current_user.id).all()
    return {"assets": [asset.to_dict() for asset in assets]}


@asset_routes.route("/", methods=["POST"])
@login_required
def new_asset():
    totalPrice = request.json["totalPrice"]
    amount = request.json["amount"]
    planetId = request.json["planetId"]
    print("\n\n\n\n\n", current_user.cash_balance, "\n\n\n")
    current_user.cash_balance = current_user.cash_balance + float(totalPrice)
    print("\n\n\n\n\n", current_user.cash_balance, "\n\n\n")
    created = Asset(userId=current_user.id, planetId=planetId, shares=amount)
    db.session.add(created)
    db.session.commit()

    assetId = created.id
    userId = created.userId
    return {"id": assetId, "userId": userId}


@asset_routes.route("/", methods=["PATCH"])
@login_required
def edit_asset():
    totalPrice = request.json["totalPrice"]
    id = request.json["id"]
    print("\n\n\n\n\n", current_user.cash_balance, "\n\n\n")
    current_user.cash_balance = current_user.cash_balance + float(totalPrice)
    print("\n\n\n\n\n", current_user.cash_balance, "\n\n\n")
    number = request.json["number"]
    asset = Asset.query.filter(
        Asset.id == id and Asset.userId == current_user.id
    ).first()
    asset.shares = asset.shares + number
    shares = asset.shares
    db.session.commit()
    return {"id": id, "shares": shares}


@asset_routes.route("/", methods=["DELETE"])
@login_required
def delete_asset():
    totalPrice = request.json["totalPrice"]
    id = request.json["id"]
    print("\n\n\n\n\n", current_user.cash_balance, "\n\n\n")
    current_user.cash_balance = current_user.cash_balance + float(totalPrice)
    print("\n\n\n\n\n", current_user.cash_balance, "\n\n\n")
    asset = Asset.query.filter(
        Asset.id == id and Asset.userId == current_user.id
    ).first()

    db.session.delete(asset)
    db.session.commit()
    return {"id": id}

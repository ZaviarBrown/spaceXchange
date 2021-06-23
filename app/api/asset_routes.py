from flask import Blueprint, jsonify
from flask.globals import request
from flask_login import login_required, current_user
from app.models import db, Asset, transaction
from pprint import pprint

pp = pprint

asset_routes = Blueprint("assets", __name__)


@asset_routes.route("/")
@login_required
def assets():
    assets = Asset.query.filter(Asset.userId == current_user.id).all()
    return {"assets": [asset.to_dict() for asset in assets]}


@asset_routes.route("/", methods=["POST"])
@login_required
def new_asset():
    asset = request.json["asset"]
    created = Asset(
        userId=current_user.id, planetId=asset.planetId, shares=asset.shares
    )
    db.session.add(created)
    db.session.commit()
    return jsonify(created)


@asset_routes.route("/", methods=["PATCH"])
@login_required
def edit_asset():
    #! this is how you access the request IF IT IS JSON
    id = request.json["id"]
    number = request.json["number"]
    print(id, number)
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
    id = request.json["id"]
    asset = Asset.query.all().filter(Asset.id == id and Asset.userId == current_user.id)

    db.session.delete(asset)
    db.session.commit()
    return

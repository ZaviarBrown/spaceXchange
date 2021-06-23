from flask import Blueprint, jsonify
from flask.globals import request
from flask_login import login_required, current_user
from app.models import db, Asset, transaction

asset_routes = Blueprint("assets", __name__)


@asset_routes.route("/")
@login_required
def assets():
  assets = Asset.query.filter(
    Asset.userId == current_user.id
  ).all()
  return {"assets": [asset.to_dict() for asset in assets]}

@asset_routes.route("/", methods=["POST"])
@login_required
def new_asset(asset):
  created = Asset(
    userId = current_user.id,
    planetId = asset.planetId,
    shares = asset.shares
  )
  db.session.add(created)
  db.session.commit()
  return jsonify(created)

@asset_routes.route("/", methods=["PATCH"])
@login_required
def edit_asset():
  print("HELLLLLOOOO", request)
  # id,number = request
  id = 1
  number = 1
  asset = Asset.query.filter(
    Asset.id == id and Asset.userId == current_user.id
  ).first()
  #we might need conditions?
  print("Is this the asset?", asset)
  # asset["shares"] = asset["shares"] + number

  db.session.commit()
  return jsonify(asset)

@asset_routes.route("/", methods=["DELETE"])
@login_required
def delete_asset(id):
  asset = Asset.query.all().filter(
    Asset.id == id and Asset.userId == current_user.id
  )

  db.session.delete(asset)
  db.session.commit()
  return 
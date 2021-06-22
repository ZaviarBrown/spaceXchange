from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, Asset, transaction

asset_routes = Blueprint("assets", __name__)


@asset_routes.route("/")
@login_required
def assets():
  assets = Asset.query.all().filter(
    Asset.userId == current_user.id
  )
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
  return

@asset_routes.route("/", methods=["PATCH"])
@login_required
def edit_asset(data):
  id,number = data
  asset = Asset.query.all().filter(
    Asset.id == id and Asset.userId == current_user.id
  )
  #we might need conditions?
  asset["shares"] += number

  db.session.commit()

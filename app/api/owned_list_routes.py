from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Asset

owned_list_routes = Blueprint("owned_list", __name__)


@owned_list_routes.route("/")
@login_required
def owned_list():
    assets = Asset.query.filter(Asset.userId == current_user.id).all()
    return {"assets": [asset.to_dict() for asset in assets]}


@owned_list_routes.route("/", methods=["DELETE"])
@login_required
def delete_list():
    print(request.json)
    assetId = request.json["assetId"]
    asset = Asset.query.filter(Asset.id == assetId).first()
    db.session.delete(asset)
    db.session.commit()
    return jsonify(assetId)

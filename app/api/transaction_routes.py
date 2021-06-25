from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Transaction

transaction_routes = Blueprint("transactions", __name__)


@transaction_routes.route("/")
@login_required
def transactions():
    transactions = Transaction.query.filter(Transaction.userId == current_user.id).all()
    return {"transactions": [trans.to_dict() for trans in transactions]}


@transaction_routes.route("/", methods=["POST"])
@login_required
def new_transaction():
    new_trans = request.json
    transaction = Transaction(
        userId=current_user.id,
        planetId=new_trans["planetId"],
        shares=new_trans["number"],
        price_paid=new_trans["transPrice"],
        orderType=new_trans["orderType"],
    )
    db.session.add(transaction)
    db.session.commit()
    return {"transactions": transaction.to_dict()}

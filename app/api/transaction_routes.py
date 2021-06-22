from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, Transaction

transaction_routes = Blueprint("transactions", __name__)


@transaction_routes.route("/")
@login_required
def transactions():
    transactions = Transaction.query.all().filter(
        Transaction.user_id == current_user.id
    )
    return {"transactions": [transaction.to_dict() for trans in transactions]}


@transaction_routes.route("/", methods=["POST"])
@login_required
def new_transaction(new_trans):
    transaction = Transaction(
        user_id=current_user.id,
        planet_id=new_trans["plantedId"],
        shares=new_trans["shares"],
        price_paid=new_trans["price_paid"],
    )
    db.session.add(transaction)
    db.session.commit()
    return {"transactions": [transaction.to_dict() for trans in transactions]}

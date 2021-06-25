from .db import db


class Planet(db.Model):
    __tablename__ = "planets"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    price = db.Column(db.Numeric(asdecimal=False), nullable=False)
    ticker = db.Column(db.String(10), nullable=False)
    description = db.Column(db.Text, nullable=False)
    labor_force = db.Column(db.Integer, nullable=False)
    planet_leader = db.Column(db.String(50), nullable=False)
    top_export = db.Column(db.String(50), nullable=False)
    crypto = db.Column(db.String(50), nullable=False)

    assets = db.relationship("Asset", back_populates="planets")
    transactions = db.relationship("Transaction", back_populates="planets")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "ticker": self.ticker,
            "description": self.description,
            "labor_force": self.labor_force,
            "planet_leader": self.planet_leader,
            "top_export": self.top_export,
            "crypto": self.crypto,
        }

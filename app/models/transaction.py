from .db import db


class Transaction(db.Model):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    planetId = db.Column(db.Integer, db.ForeignKey("planets.id"), nullable=False)
    shares = db.Column(db.Integer, nullable=False)
    price_paid = db.Column(db.Numeric(asdecimal=False), nullable=False)

    user = db.relationship("User", back_populates="transactions")
    planets = db.relationship("Planet", back_populates="transactions")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "planetId": self.planetId,
            "shares": self.shares,
            "price_paid": self.price_paid,
        }

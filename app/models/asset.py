from .db import db


class Asset(db.Model):
    __tablename__ = "assets"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    planetId = db.Column(db.Integer, db.ForeignKey("planets.id"), nullable=False)
    planetName = db.Column(db.String(50), nullable=False)
    ticker = db.Column(db.String(10), nullable=False)
    shares = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="assets")
    planets = db.relationship("Planet", back_populates="assets")

    def __repr__(self):
        return f"id{self.id}, shares{self.shares}"

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "planetId": self.planetId,
            "planetName": self.planetName,
            "ticker": self.ticker,
            "shares": self.shares,
        }

from .db import db


class Asset(db.Model):
    __tablename__ = 'assets'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    planetId = db.Column(db.Integer, db.ForeignKey(
        "planets.id"), nullable=False)
    shares = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="assets")
    planets = db.relationship("Planet", back_populates="assets")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "planetId": self.planetId,
            "shares": self.shares
        }

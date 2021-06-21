from app.models import db, Asset


def seed_assets():

  demoUser = Asset(userId=1, planetId=1, shares=29)

  db.session.add(demoUser)

  db.session.commit()

def undo_assets():
  db.session.execute("TRUNCATE users RESTART IDENTITY CASCADE;")
  db.session.commit()
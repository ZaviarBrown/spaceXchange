from app.models import db, Asset


def seed_assets():

    demoUserP1 = Asset(userId=1, planetId=1,
                       planetName="Mercury", ticker="MCRY", shares=6)
    demoUserP2 = Asset(userId=1, planetId=2,
                       planetName="Venus", ticker="VNUS", shares=8)
    demoUserP3 = Asset(userId=1, planetId=3,
                       planetName="Mars", ticker="MARS", shares=6)
    demoUserP4 = Asset(userId=1, planetId=4,
                       planetName="Jupiter", ticker="JPTR", shares=6)
    demoUserP5 = Asset(userId=1, planetId=5,
                       planetName="Saturn", ticker="STRN", shares=3)

    db.session.add(demoUserP1)
    db.session.add(demoUserP2)
    db.session.add(demoUserP3)
    db.session.add(demoUserP4)
    db.session.add(demoUserP5)

    db.session.commit()


def undo_assets():
    db.session.execute("TRUNCATE users RESTART IDENTITY CASCADE;")
    db.session.commit()

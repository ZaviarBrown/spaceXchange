from app.models import db, Asset


def seed_assets():

    demoUserP1 = Asset(userId=1, planetId=18, planetName="Kesprytt", ticker="KSPYT", shares=1, crypto="monero")
    demoUserP2 = Asset(userId=1, planetId=16, planetName="Indri", ticker="INDRI", shares=3, crypto="binancecoin")
    demoUserP3 = Asset(userId=1, planetId=1, planetName="Mercury", ticker="MCRY", shares=3, crypto="dogecoin")
    demoUserP4 = Asset(userId=1, planetId=19, planetName="Ledonia", ticker="LDNIA", shares=7, crypto="aave")
    demoUserP5 = Asset(userId=1, planetId=7, planetName="Neptune", ticker="NPTN", shares=5, crypto="klay-token")
    demoUserP6 = Asset(userId=1, planetId=5, planetName="Saturn", ticker="STRN", shares=5, crypto="cardano")
    demoUserP7 = Asset(userId=1, planetId=17, planetName="Jouret", ticker="JORET", shares=6, crypto="dash")
    demoUserP8 = Asset(userId=1, planetId=10, planetName="Caldonia", ticker="CLDNA", shares=2, crypto="huobi-btc")
    demoUserP9 = Asset(userId=1, planetId=3, planetName="Mars", ticker="MARS", shares=420, crypto="leo-token")
    demoUserP10 = Asset(userId=1, planetId=9, planetName="Benzar", ticker="BNZAR", shares=18, crypto="wrapped-bitcoin")
    demoUserP11 = Asset(userId=1, planetId=14, planetName="Gelrak", ticker="GLRAK", shares=1, crypto="staked-ether")
    demoUserP12 = Asset(userId=1, planetId=6, planetName="Uranus", ticker="URNS", shares=69, crypto="algorand")
    
    
    db.session.add(demoUserP1)
    db.session.add(demoUserP2)
    db.session.add(demoUserP3)
    db.session.add(demoUserP4)
    db.session.add(demoUserP5)
    db.session.add(demoUserP6)
    db.session.add(demoUserP7)
    db.session.add(demoUserP8)
    db.session.add(demoUserP9)
    db.session.add(demoUserP10)
    db.session.add(demoUserP11)
    db.session.add(demoUserP12)

    db.session.commit()


def undo_assets():
    db.session.execute("TRUNCATE users RESTART IDENTITY CASCADE;")
    db.session.commit()

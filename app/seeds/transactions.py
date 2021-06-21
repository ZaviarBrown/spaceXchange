from app.models import db, Transaction


def seed_transactions():

    t1 = Transaction(userId=1, planetId=1, shares=3, price_paid=5)
    t2 = Transaction(userId=1, planetId=1, shares=5, price_paid=2)
    t3 = Transaction(userId=1, planetId=1, shares=3, price_paid=98)
    t4 = Transaction(userId=1, planetId=1, shares=3, price_paid=8)
    t5 = Transaction(userId=1, planetId=1, shares=3, price_paid=4)
    t6 = Transaction(userId=1, planetId=1, shares=3, price_paid=3)
    t7 = Transaction(userId=1, planetId=1, shares=3, price_paid=78)
    t8 = Transaction(userId=1, planetId=1, shares=3, price_paid=3)
    t9 = Transaction(userId=1, planetId=1, shares=3, price_paid=66)

    db.session.add(t9)
    db.session.add(t8)
    db.session.add(t7)
    db.session.add(t6)
    db.session.add(t5)
    db.session.add(t4)
    db.session.add(t3)
    db.session.add(t2)
    db.session.add(t1)

    db.session.commit()


def undo_transactions():
    db.session.execute("TRUNCATE users RESTART IDENTITY CASCADE;")
    db.session.commit()

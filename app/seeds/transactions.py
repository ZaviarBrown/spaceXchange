from app.models import db, Transaction


def seed_transactions():

    t1 = Transaction(userId=1, planetId=1, orderType="buy",
                     shares=3, price_paid=2.64)
    t2 = Transaction(userId=1, planetId=2, orderType="buy",
                     shares=5, price_paid=1.6)
    t3 = Transaction(userId=1, planetId=3, orderType="buy",
                     shares=3, price_paid=6.42)
    t4 = Transaction(userId=1, planetId=4, orderType="buy",
                     shares=3, price_paid=1.89)
    t5 = Transaction(userId=1, planetId=1, orderType="buy",
                     shares=3, price_paid=2.64)
    t6 = Transaction(userId=1, planetId=2, orderType="buy",
                     shares=3, price_paid=0.96)
    t7 = Transaction(userId=1, planetId=3, orderType="buy",
                     shares=3, price_paid=6.42)
    t8 = Transaction(userId=1, planetId=4, orderType="buy",
                     shares=3, price_paid=1.89)
    t9 = Transaction(userId=1, planetId=5, orderType="buy",
                     shares=3, price_paid=3.87)

    db.session.add(t1)
    db.session.add(t2)
    db.session.add(t3)
    db.session.add(t4)
    db.session.add(t5)
    db.session.add(t6)
    db.session.add(t7)
    db.session.add(t8)
    db.session.add(t9)

    db.session.commit()


def undo_transactions():
    db.session.execute("TRUNCATE users RESTART IDENTITY CASCADE;")
    db.session.commit()

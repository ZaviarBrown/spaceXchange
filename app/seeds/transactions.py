from app.models import db, Transaction


def seed_transactions():

    t1 = Transaction(userId=1, planetId=18, orderType="buy", shares=3, price_paid=481230.58)
    t2 = Transaction(userId=1, planetId=16, orderType="buy", shares=4, price_paid=10667.68)
    t3 = Transaction(userId=1, planetId=18, orderType="sell", shares=2, price_paid=394995.72)
    t4 = Transaction(userId=1, planetId=1, orderType="buy", shares=3, price_paid=0.4217)
    t5 = Transaction(userId=1, planetId=16, orderType="sell", shares=1, price_paid=2701.23)
    t6 = Transaction(userId=1, planetId=19, orderType="buy", shares=10, price_paid=345186.40)
    t7 = Transaction(userId=1, planetId=7, orderType="buy", shares=12, price_paid=7.04)
    t8 = Transaction(userId=1, planetId=5, orderType="buy", shares=5, price_paid=6.10)
    t9 = Transaction(userId=1, planetId=19, orderType="sell", shares=3, price_paid=119554.92)
    t10 = Transaction(userId=1, planetId=17, orderType="buy", shares=6, price_paid=9343.32)
    t11 = Transaction(userId=1, planetId=10, orderType="buy", shares=2, price_paid=1138887.74)
    t12 = Transaction(userId=1, planetId=3, orderType="buy", shares=420, price_paid=789.60)
    t13 = Transaction(userId=1, planetId=9, orderType="buy", shares=18, price_paid=7450603.02)
    t14 = Transaction(userId=1, planetId=14, orderType="buy", shares=1, price_paid=261339.86)
    t15 = Transaction(userId=1, planetId=7, orderType="sell", shares=7, price_paid=9.3912)
    t16 = Transaction(userId=1, planetId=6, orderType="buy", shares=69, price_paid=48.0861)


    db.session.add(t1)
    db.session.add(t2)
    db.session.add(t3)
    db.session.add(t4)
    db.session.add(t5)
    db.session.add(t6)
    db.session.add(t7)
    db.session.add(t8)
    db.session.add(t9)
    db.session.add(t10)
    db.session.add(t11)
    db.session.add(t12)
    db.session.add(t13)
    db.session.add(t14)
    db.session.add(t15)
    db.session.add(t16)

    db.session.commit()


def undo_transactions():
    db.session.execute("TRUNCATE users RESTART IDENTITY CASCADE;")
    db.session.commit()

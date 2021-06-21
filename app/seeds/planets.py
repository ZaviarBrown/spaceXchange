from app.models import db, Planet

def seed_planets():

  mars = Planet(name="Mars", price=3.00, description="The red planet. First planet to be colonized by Earth. After generations of developmental progress, Mars has a thriving economy based on the mining of red rock and technological innovation.", labor_force=150000000)

  db.session.add(mars)

  db.session.commit()


def undo_planets():
  db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
  db.session.commit()
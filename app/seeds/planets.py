from app.models import db, Planet


def seed_planets():

    mercury = Planet(
        name="Mercury",
        price=0.88,
        ticker="MCRY",
        description="The closest planet to our sun and the smallest planet in our Solar System. Due to the abundance of iron ore, Mercury has primarily turned into a material mining planet.",
        labor_force=5000000
    )

    venus = Planet(
        name="Venus",
        price=0.32,
        ticker="VNUS",
        description="With a surface temperature of 462°C (864°F), Venus holds the title of hottest planet in our Solar System. Since these are uninhabitable conditions for humans, the planet is completely run by AI machines.",
        labor_force=0
    )

    mars = Planet(
        name="Mars",
        price=2.14,
        ticker="MARS",
        description="The red planet. First planet to be colonized by Earth. After generations of incredible developmental progress, Mars has a thriving economy and has earned a reputation of 'Earth 2.0'.",
        labor_force=150000000,
    )

    jupiter = Planet(
        name="Jupiter",
        price=0.63,
        ticker="JPTR",
        description="At 317 times the mass of Earth, Jupiter reigns supreme as the most massive planet in our Solar System. Due to being a gas giant with incredibly violent storms, Jupiter's inhabitants actually live scattered across its 79 moons.",
        labor_force=5000000
    )

    saturn = Planet(
        name="Saturn",
        price=1.29,
        ticker="STRN",
        description="Saturn's rings are its most recognizable feature, and have become a tourist attraction for space travelers. However, since Saturn is a gas giant, the space hotels are all located on Saturn's 82 moons",
        labor_force=5000000
    )

    uranus = Planet(
        name="Uranus",
        price=0.81,
        ticker="URNS",
        description="Despite being a gas giant, Uranus is the coldest planet in our Solar System and has been dubbed an ice giant. The Uranus workforce is mostly located on the 27 moons that orbit it.",
        labor_force=5000000
    )

    neptune = Planet(
        name="Neptune",
        price=0.96,
        ticker="NPTN",
        description="The last planet in the Solar System and the last planet to be colonized, it shares the gas giant/ice giant label with Uranus. However, having an Earth-sized solid core allows for living beings to inhabit this planet to harvest its precious elements.",
        labor_force=5000000
    )

    db.session.add(mercury)
    db.session.add(venus)
    db.session.add(mars)
    db.session.add(jupiter)
    db.session.add(saturn)
    db.session.add(uranus)
    db.session.add(neptune)

    db.session.commit()


def undo_planets():
    db.session.execute("TRUNCATE users RESTART IDENTITY CASCADE;")
    db.session.commit()

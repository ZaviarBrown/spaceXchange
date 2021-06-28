from app.models import db, Planet


def seed_planets():

    mercury = Planet(
        name="Mercury",
        price=0.242524,
        ticker="MCRY",
        description="The closest planet to our sun and the smallest planet in our Solar System. Due to the abundance of iron ore, Mercury has primarily turned into a material mining planet.",
        labor_force=512017,
        planet_leader="Brian Shores",
        top_export="Iron",
        crypto="dogecoin",
    )

    venus = Planet(
        name="Venus",
        price=0.435817,
        ticker="VNUS",
        description="With a surface temperature of 462°C (864°F), Venus holds the title of hottest planet in our Solar System. Since these are uninhabitable conditions for humans, the planet is completely run by AI machines.",
        labor_force=0,
        planet_leader="XEV-99823",
        top_export="Heat Fuel Cells",
        crypto="theta-fuel",
    )

    mars = Planet(
        name="Mars",
        price=2.39,
        ticker="MARS",
        description="The red planet. First planet to be colonized by Earth. After generations of incredible developmental progress, Mars has a thriving economy and has earned a reputation of 'Earth 2.0'.",
        labor_force=1520231,
        planet_leader="Elon Musk MARK III",
        top_export="Teleport Technology",
        crypto="leo-token",
    )

    jupiter = Planet(
        name="Jupiter",
        price=0.622474,
        ticker="JPTR",
        description="At 317 times the mass of Earth, Jupiter reigns supreme as the most massive planet in our Solar System. Due to being a gas giant with incredibly violent storms, Jupiter's inhabitants actually live scattered across its 79 moons.",
        labor_force=5955846,
        planet_leader="Henry Brewer",
        top_export="Lightning Bottles",
        crypto="0x",
    )

    saturn = Planet(
        name="Saturn",
        price=1.29,
        ticker="STRN",
        description="Saturn's rings are its most recognizable feature, and have become a tourist attraction for space travelers. However, since Saturn is a gas giant, the space hotels are all located on Saturn's 82 moons",
        labor_force=1988340,
        planet_leader="Zach Yu",
        top_export="Stephen Choung",
        crypto="cardano",
    )

    uranus = Planet(
        name="Uranus",
        price=0.807278,
        ticker="URNS",
        description="Despite being a gas giant, Uranus is the coldest planet in our Solar System and has been dubbed an ice giant. The Uranus workforce is mostly located on the 27 moons that orbit it.",
        labor_force=4525502,
        planet_leader="Oliver Klozeoff",
        top_export="Quantum Fluids",
        crypto="algorand",
    )

    neptune = Planet(
        name="Neptune",
        price=0.986541,
        ticker="NPTN",
        description="The last planet in the Solar System and the last planet to be colonized, it shares the gas giant/ice giant label with Uranus. However, having an Earth-sized solid core allows for living beings to inhabit this planet to harvest its precious elements.",
        labor_force=7292875,
        planet_leader="Juliet Shafto",
        top_export="Juice",
        crypto="klay-token",
    )

    amerind = Planet(
        name="Amerind",
        price=100620.85,
        ticker="AMRND",
        description="Amerind was an inhabited planet said to be half a galaxy away from Earth, which was nonetheless discovered in the 23rd century to contain settlements of pre-industrial Humans, the Amerind inhabitants.",
        labor_force=7539152,
        planet_leader="Sheri Jonson",
        top_export="Canoes",
        crypto="kusama",
    )

    benzar = Planet(
        name="Benzar",
        price=422402.76,
        ticker="BNZAR",
        description="Benzar was the homeworld of the Benzite civilization, and a significant member of the United Federation of Planets. In 2256, during the Federation-Klingon War, the USS Discovery successfully broke a Klingon supply line at this planet.",
        labor_force=73783527,
        planet_leader="Erica Perry",
        top_export="Holographic Technology",
        crypto="wrapped-bitcoin",
    )

    caldonia = Planet(
        name="Caldonia",
        price=520062.40,
        ticker="CLDNA",
        description="Caldonia was an inhabited planet. The planet had rich deposits of trillium 323. This was the homeworld for the Caldonians, a warp-capable humanoid species.",
        labor_force=2087424,
        planet_leader="Melissa Tennison",
        top_export="Caldonian Finger Traps",
        crypto="huobi-btc",
    )

    denobula = Planet(
        name="Denobula",
        price=2328334.47,
        ticker="DNBLA",
        description="Denobula was an inhabited planet in the Denobula Triaxa system. This system was located in the Beta Quadrant. It was the homeworld of the Denobulans, a warp-capable humanoid species, as well as of the Denobulan lemur.",
        labor_force=27895450,
        planet_leader="Albert Ceja",
        top_export="Petroleum",
        crypto="yearn-finance",
    )

    eridani = Planet(
        name="Eridani",
        price=18281.07,
        ticker="ERDNI",
        description="Eridani was a planet with at least seven moons. On Michael Burnham's tenth birthday, in 2236, her foster mother Amanda Grayson traveled with her on a shuttle to this planet's system.",
        labor_force=1184630,
        planet_leader="Angela Hawkins",
        top_export="Uranium",
        crypto="maker",
    )

    fahleena = Planet(
        name="Fahleena",
        price=12925.43,
        ticker="FHLNA",
        description="Along with Mariah IV and Ultima Thule, Fahleena was a stop on a route formerly taken by Valerian traders supplying weapons-grade dolamide to the Cardassians.",
        labor_force=27944040,
        planet_leader="William Drake",
        top_export="Dolamide",
        crypto="ethereum",
    )

    gelrak = Planet(
        name="Gelrak",
        price=583733.31,
        ticker="GLRAK",
        description="Gelrak V was an inhabited planet, and the homeworld of the Gelrakians. In 2380, Commander Jack Ransom and Ensign Beckett Mariner of the USS Cerritos went on an away mission to Gelrak V.",
        labor_force=82951398,
        planet_leader="Dennis Myers",
        top_export="GL Crystals",
        crypto="staked-ether",
    )

    himaa = Planet(
        name="Himaa",
        price=17110.65,
        ticker="HIMAA",
        description="Himaa was an inhabited planet. It had a single sun and at least four moons. The planet hosted a variety of native lifeforms, including a bird, a predatory insect, a winged insect, a fish, and a mobile aquatic plant with healing properties.",
        labor_force=2087424,
        planet_leader="Lando Cantlistenin",
        top_export="Mercantile",
        crypto="bitcoin-cash",
    )

    indri = Planet(
        name="Indri",
        price=2889.91,
        ticker="INDRI",
        description="Indri was the L-class eighth planet in the Indri system, in the Beta Quadrant. Indri was one of the planets seeded with part of a genetic program by the ancient humanoids 4.5 billion years ago.",
        labor_force=4304595,
        planet_leader="Hannibale Leptur",
        top_export="Lab-grown Human Meat",
        crypto="binancecoin",
    )

    jouret = Planet(
        name="Jouret",
        price=1654.38,
        ticker="JORET",
        description="Jouret IV was the fourth planet in the Jouret system of the Beta Quadrant. In 2366, it was an inhabited planet. Founded over a century before, the New Providence colony was one of the Federation's outermost colonies.",
        labor_force=9624912,
        planet_leader="Jayden Smith",
        top_export="Jouret Seed",
        crypto="dash",
    )

    kesprytt = Planet(
        name="Kesprytt",
        price=197497.86,
        ticker="KSPYT",
        description="Kesprytt was the inhabited third planet of its star system, and was the homeworld of the Kesprytt. The planet was divided into two large nation-states controlled by the Kes and the Prytt Alliance.",
        labor_force=6178536,
        planet_leader="Kanye West",
        top_export="Lucky Charms",
        crypto="monero",
    )

    ledonia = Planet(
        name="Ledonia",
        price=39851.64,
        ticker="LDNIA",
        description="Ledonia was the third planet in its star system. This planet was home to an exotic plant. Ledonian soil contained a benevolent mycorrhizal fungus that helped the native plants retain water.",
        labor_force=3170462,
        planet_leader="Joe Rogan",
        top_export="Ledonian mycorrhizal fungus",
        crypto="aave",
    )

    maranga = Planet(
        name="Maranga",
        price=86903689.77,
        ticker="MRNGA",
        description="Maranga the anime planet and is the entertainment source for the Universe. Every inhabitant of Maranga is an actual anime character, and every anime is filmed here, live. Many of the Universe's heros, and villians, were born on Maranga",
        labor_force=63262770,
        planet_leader="X AE A-12 (Elon Musk's Son)",
        top_export="Anime",
        crypto="bitcoin",
    )

    db.session.add(mercury)
    db.session.add(venus)
    db.session.add(mars)
    db.session.add(jupiter)
    db.session.add(saturn)
    db.session.add(uranus)
    db.session.add(neptune)
    db.session.add(amerind)
    db.session.add(benzar)
    db.session.add(caldonia)
    db.session.add(denobula)
    db.session.add(eridani)
    db.session.add(fahleena)
    db.session.add(gelrak)
    db.session.add(himaa)
    db.session.add(indri)
    db.session.add(jouret)
    db.session.add(kesprytt)
    db.session.add(ledonia)
    db.session.add(maranga)

    db.session.commit()


def undo_planets():
    db.session.execute("TRUNCATE users RESTART IDENTITY CASCADE;")
    db.session.commit()

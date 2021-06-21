from flask import Blueprint
from app.models import Planet

planet_routes = Blueprint('planet', __name__)

@planet_routes.route('/<int:id>')
def planet(id):
  planet = Planet.query.get(id)
  print(planet.to_dict())
  return planet.to_dict()
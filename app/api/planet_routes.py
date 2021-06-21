from flask import Blueprint
from app.models import Planet

planet_routes = Blueprint('planet', __name__)

@planet_routes.route('/<int:id>')
def planet(id):
  planet = Planet.query.get(id)
  return planet.to_dict()
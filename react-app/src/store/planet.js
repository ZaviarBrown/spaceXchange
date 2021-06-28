const GET_PLANET = 'planets/GET_PLANET';
const GET_PLANETS = 'planets/GET_PLANETS';

const getPlanet = (planets) => ({
  type: GET_PLANET,
  payload: planets,
});

const getPlanets = (planets) => ({
  type: GET_PLANETS,
  payload: planets,
});

export const getOnePlanet = (id) => async (dispatch) => {
  const res = await fetch(`/api/planet/${id}`);

  const planet = await res.json();

  dispatch(getPlanet(planet));
};

export const getAllPlanets = () => async (dispatch) => {
  const res = await fetch('/api/planet/');

  const planets = await res.json();

  dispatch(getPlanets(planets));
};

const initialState = {};

export default function planet(state = initialState, action) {
  switch (action.type) {
    case GET_PLANET: {
      let newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case GET_PLANETS: {
      let newState = { ...state };
      action.payload.planets.forEach((planet) => {
        newState[planet.id] = planet;
      });
      return newState;
    }
    default:
      return state;
  }
}

const GET_PLANET = 'planets/GET_PLANET';

const getPlanet = (planet) => ({
  type: GET_PLANET,
  payload: planet,
});

export const getOnePlanet = (id) => async (dispatch) => {
  const res = await fetch(`/api/planet/${id}`);

  const planet = await res.json();

  dispatch(getPlanet(planet));
};

const initialState = {};

export default function planet(state = initialState, action) {
  switch (action.type) {
    case GET_PLANET:
      let newState = { ...state }
      newState[action.payload.id] = action.payload
      return newState
    default:
      return state;
  }
}

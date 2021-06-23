// actions

const GET_LIST_ITEM = 'ownedList/GET_LIST_ITEM';

// action creators

const getListItem = (assetsOwned) => ({
  type: GET_LIST_ITEM,
  payload: assetsOwned,
});

// thunks

export const getListItems = () => async (dispatch) => {
  let data = await fetch('/api/owned_list/', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  data = await data.json();
  if (data.errors) {
    return;
  }
  dispatch(getListItem(data.assets));
};

// initial state

let initialState = {};

// reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_ITEM: {
      const newState = { ...state };
      action.payload.forEach((asset) => {
        newState[asset.id] = asset;
      });
      return newState;
    }
    default:
      return state;
  }
}

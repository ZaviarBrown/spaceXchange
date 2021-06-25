// actions

const GET_ASSETS = 'assets/GET_ASSETS';
const EDIT_ASSET = 'assets/EDIT_ASSET';
const CREATE_ASSET = 'assets/CREATE_ASSET';
const DELETE_ASSET = 'assets/DELETE_ASSET';

// action creators
// do I need a parameter?

const getAssets = (assets) => ({
  type: GET_ASSETS,
  payload: assets,
});

const editAsset = (assetId, newShares) => ({
  type: EDIT_ASSET,
  payload: { assetId, newShares },
});

const createAsset = (id, planetId, planetName, amount, userId, ticker) => ({
  type: CREATE_ASSET,
  payload: { id, planetId, userId, amount, planetName, ticker }
});

const deleteAsset = (id) => ({
  type: DELETE_ASSET,
  payload: id,
});

// thunks

export const getAllAssets = () => async (dispatch) => {
  let data = await fetch('/api/assets/', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  //! We may have to key into the return of assets GET route
  data = await data.json();
  if (data.errors) {
    return;
  }
  dispatch(getAssets(data.assets));
};

export const editOneAsset = (id, number, totalPrice) => async (dispatch) => {
  let body = JSON.stringify({ id, number, totalPrice });
  let data = await fetch('/api/assets/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });
  data = await data.json();
  if (data.errors) {
    return;
  }
  let newShares = data.shares
  let assetId = data.id
  dispatch(editAsset(assetId, newShares));
};

export const createOneAsset = (amount, planetId, totalPrice, planetName, ticker) => async (dispatch) => {
  let body = JSON.stringify({ amount, planetId, totalPrice, planetName, ticker });
  let data = await fetch('/api/assets/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });
  data = await data.json();
  //! need to confirm that return is proper in asset routes line 26
  if (data.errors) {
    return;
  }
  let id = data['id']
  let userId = data['userId']

  dispatch(createAsset(id, planetId, userId, amount, planetName, ticker));
};

export const deleteOneAsset = (id, totalPrice) => async (dispatch) => {
  let body = JSON.stringify({ id, totalPrice });
  let data = await fetch('/api/assets/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });
  data = await data.json();
  if (data.errors) {
    return;
  }
  dispatch(deleteAsset(id));
};

// initial state

let initialState = {};

// reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ASSETS: {
      const newState = { ...state };
      action.payload.forEach((asset) => {
        newState[asset.id] = asset;
      });
      return newState;
    }
    case EDIT_ASSET: {
      const newState = { ...state };
      newState[action.payload.assetId].shares = action.payload.newShares;
      return newState;
    }
    case CREATE_ASSET: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_ASSET: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    default:
      return state;
  }
}

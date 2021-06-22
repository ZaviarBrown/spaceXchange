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

const editAsset = (id, number) => ({
  type: EDIT_ASSET,
  payload: { id, number },
});

const createAsset = (asset) => ({
  type: CREATE_ASSET,
  payload: asset,
});

const deleteAsset = (id) => ({
  type: DELETE_ASSET,
  payload: id,
});

// thunks

export const getAllAssets = async () => (dispatch) => {
  let data = await fetch('/api/assets/', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  data = await data.json();

  if (data.errors) {
    return;
  }
  dispatch(getAssets(data));
};

export const editOneAsset = async (id, number) => (dispatch) => {
  let body = JSON.stringify({ id, number });
  let data = await fetch('/api/assets/:id', {
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
  dispatch(editAsset(data));
};

export const createOneAsset = async (asset) => (dispatch) => {
  let body = JSON.stringify(asset);
  let data = await fetch('/api/assets/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });
  data = await data.json();
  if (data.errors) {
    return;
  }
  dispatch(createAsset(data));
};

export const deleteOneAsset = async (id) => (dispatch) => {
  let body = JSON.stringify(id);
  let data = await fetch('/api/assets/:id', {
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
      let assetArr = Array.from(action.payload)
      assetArr.forEach((asset)=>{
        newState[asset.id] = asset
      })
      return newState
    }
    case EDIT_ASSET: {
      const newState = {...state};
      if (action.payload.number > 0) {
        newState[action.payload.id][shares] += action.payload.number
      }
      if (action.payload.number < 0) {
        newState[action.payload.id][shares] -= action.payload.number
      }
      return newState
    }
    case CREATE_ASSET: {
      const newState = {...state}
      newState[action.payload.id] = action.payload
      return newState
    }
    case DELETE_ASSET: {
      const newState = {...state}
      delete newState[action.payload.id]
      return newState
    }
    default:
      return state;
  }

}

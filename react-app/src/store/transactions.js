// actions

const GET_TRANSACTIONS = 'transactions/GET_TRANSACTIONS'
const CREATE_TRANSACTION = "transactions/CREATE_TRANSACTION"
const DELETE_TRANSACTION = "transactions/DELETE_TRANSACTION"

// action creators

const getTransactions = (transactions) => ({
    type: GET_TRANSACTIONS,
    payload: transactions
})

const createTransaction = (id, planetId, price_paid, shares) => ({
    type: CREATE_TRANSACTION,
    payload: { id, planetId, price_paid, shares }
})

const deleteTransaction = (id) => ({
    type: DELETE_TRANSACTION,
    payload: id
})


// thunks

export const getAllTransactions = () => async (dispatch) => {
    const response = await fetch('/api/transactions/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(getTransactions(data))
}
export const createATransaction = (transPrice, planetId, number) => async (dispatch) => {
    let newTransaction = JSON.stringify({ transPrice, planetId, number });
    const response = await fetch('/api/transactions/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: newTransaction
    });
    const data = await response.json();
    if (data.errors) {
        return;
    }
    console.log("trans data\n\n\n", data)
    let id = data['transactions'].id;
    dispatch(createTransaction(id, planetId, transPrice, number))
}

// initial state

let initialState = {}

// reducer

export default function reducer(state = initialState, action) {
    switch (action.type) {
        //written for object for now
        case GET_TRANSACTIONS: {
            const newState = { ...state }
            let transArr = action.payload['transactions']
            transArr.forEach((trans) => {
                newState[trans.id] = trans
            })
            return newState
        }

        case CREATE_TRANSACTION: {
            const newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }

        case DELETE_TRANSACTION: {
            const newState = { ...state }
            delete newState[action.payload]
            return newState
        }

        default:
            return state
    }
}
// actions

const GET_TRANSACTIONS = 'transactions/GET_TRANSACTIONS'
const CREATE_TRANSACTION = "transactions/CREATE_TRANSACTION"
const DELETE_TRANSACTION = "transactions/DELETE_TRANSACTION"

// action creators

const getTransactions = (transactions) => ({
    type: GET_TRANSACTIONS,
    payload: transactions
})

const createTransaction = (newTransaction) => ({
    type: CREATE_TRANSACTION,
    payload: newTransaction
})

const deleteTransaction = (id) => ({
    type: DELETE_TRANSACTION,
    payload: id
})


// thunks

export const getAllTransactions = (transactions) => (dispatch) => {
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
export const createATransaction = (transaction) => (dispatch) => {
    let newTransaction = JSON.stringify(transaction);
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
    dispatch(getTransactions(data))
}

// initial state

let initialState = {}

// reducer

export default function reducer(state = initialState, action) {
    switch (action.type) {
        //written for object for now
        case GET_TRANSACTIONS: {
            const newState = { ...state }
            let transArr = Array.from(action.payload)
            transArr.forEach((trans) => {
                newState[trans.id] = trans
            })
            return newState
        }

        case CREATE_TRANSACTION: {
            const newState = { ...state }
            newState[action.payload] = action.payload
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
const userLocalStorage = JSON.parse(window.localStorage.getItem('social-redux-user'))
const initialState = {
    currentUser: userLocalStorage ? userLocalStorage : null,
    listUser: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            }
        case 'DELETE_CURRENT_USER': 
        return {
            ...state,
            currentUser: action.payload
        }
        case 'GET_LIST_USER':
            return {
                ...state,
                listUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer
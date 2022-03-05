const initialState = {
    isCreatePost: false,
    posts: []
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_CREATE_POST_BOX':
            return {
                ...state,
                isCreatePost: action.payload
            }
        case 'HIDE_CREATE_POST_BOX':
            return {
                ...state,
                isCreatePost: action.payload
            }
        // case 'CREATE_POST':
        //     return {
        //         ...state,
        //         posts: [...state.posts, action.payload]
        //     }
        case 'GET_POSTS': 
        return {
            ...state,
            posts: action.payload
        }
        default:
            return state
    }
}

export default postReducer
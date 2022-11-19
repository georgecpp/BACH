export const userReducer = (state = {isAuthenticated:false,user:{},type:null}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload,
            type:action.payload.type
        };
        case 'LOGOUT_CURRENT_USER':
        return { 
            ...state,
            isAuthenticated: false,
            user: {},
            type:null
        };
        case 'SET_USER_TYPE':
        return {
            ...state,
            type: action.payload
        };
        default:
        return state;
    }
};
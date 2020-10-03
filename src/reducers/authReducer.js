import { types } from "../types/types";

// initialState : necesito si el usuario esta verificado previamente
const initialState = {
    checking: true,
    //uid: null,
    //name: null
}

export const authReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case types.authLogin:
            return{
                ...state,
                ...action.payload,
                checking: false,
            }

        case types.authChekingFinish:
            return{
                ...state,
                checking: false,
            }     
        case types.authLogout:
            return {
                checking:false
            }
        default:
            return state;
    }
}

// si esta no esta autenticado lo debo mandar al login
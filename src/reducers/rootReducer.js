import { combineReducers } from 'redux';
import { uiReducer } from './uiReducer';
import { calendareducer } from './calendarReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
    // como va lucier todo nuestro store
    ui: uiReducer,
    calendar: calendareducer,
    auth: authReducer

})
import { combineReducers } from 'redux'
import AuthReducer from './reducers/AuthReducer'
import NavReducer from './reducers/NavReducer'

export const appReducer = combineReducers({
    nav: NavReducer,
    auth: AuthReducer,
})

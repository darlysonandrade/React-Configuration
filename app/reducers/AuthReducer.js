/* import {
    LOGIN_FORM_CHANGE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    CHECK,
    LOADING,
    PERFIL
} from '../actions/Types'

const defaultState = {
    id: '',
    name: '',
    cnpj: '',
    email: '',
    password: '',
    access_token: '',
    isValid: false,
    emailError: false,
    passwordError: false,
    loading: false
}

export default function authReducer (state = defaultState, action) {
    switch (action.type) {
    case LOGIN_FORM_CHANGE:
        return changeFieldAndCheck(state, action.payload)
    case LOADING:
        return {
            ...state,
            loading: action.payload
        }
    case CHECK:
        return {
            ...state,
            access_token: action.payload,
            loading: false
        }
    case LOGIN_REQUEST:
        return {
            ...state,
            email: action.payload.email,
            password: action.payload.password,
            loading: true,
            error: ''
        }
    case LOGIN_SUCCESS:
        return {
            ...state,
            access_token: action.payload.response.access_token,
            id: '',
            password: '',
            loading: false,
            error: ''
        }
    case LOGIN_FAILURE:
        return {
            defaultState
        }
    case LOGOUT_REQUEST:
        return defaultState
    default:
        return state
    }
}

const changeFieldAndCheck = (state, { name, value }) => {
    let newState = { ...state, [name]: value }
    switch (name) {
    case 'email':
        if (!validateEmail(newState.email)) {
            newState.emailError = true
        } else {
            newState.emailError = false
        }
        break
    case 'password':
        if (newState.password.length < 4) {
            newState.passwordError = true
        } else {
            newState.passwordError = false
        }
        break
    }
    newState.isValid = validateEmail(newState.email) === true && newState.password > 4
    return newState
}

function validateEmail (email) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true
    }
    return (false)
}
 */
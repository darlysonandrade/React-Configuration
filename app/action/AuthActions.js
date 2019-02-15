/* import
{
    LOGIN_FORM_CHANGE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    CHECK,
    LOADING
}
    from './Types'
import { Alert, AsyncStorage } from 'react-native'

import { CHECK_URL, LOGIN_URL } from '../config/URLs'
import { Actions } from 'react-native-router-flux'

export const changeField = (name, value) => {
    return {
        type: LOGIN_FORM_CHANGE,
        payload: { name, value }
    }
}

export function check () {
    return (dispatch) => {
        AsyncStorage.getItem('@Dropbox:token').then(
            (accessToken) => {
                if (accessToken !== null) {
                    dispatch({
                        type: LOADING,
                        payload: true
                    })
                    return fetch(CHECK_URL, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => response.json())
                        .then(json => {
                            if (json.hasOwnProperty('error')) {
                                dispatch({
                                    type: LOADING,
                                    payload: false
                                })
                            } else {
                                dispatch({
                                    type: CHECK,
                                    payload: accessToken
                                })
                                Actions.home()
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                            dispatch({
                                type: LOADING,
                                payload: false
                            })
                            Alert.alert(
                                'Erro',
                                'Servidor não está respondendo',
                                [
                                    { text: 'Cancel' },
                                    { text: 'OK' }
                                ],
                                { cancelable: false }
                            )
                        })
                }
            })
    }
}

export function loginFetch (email, password) {
    return (dispatch, getState) => {
        dispatch(loginRequest(email, password))
        return fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                grant_type: 'password'
            })
        })
            .then(response => response.json())
            .then(json => {
                if (json.hasOwnProperty('error')) {
                    dispatch(loginFailure())
                } else {
                    if (!getState().auth.emailError && !getState().auth.passwordError) {
                        dispatch(loginSuccess(email, json))
                    } else {
                        dispatch({
                            type: LOADING,
                            payload: false
                        })
                        Alert.alert(
                            'Erro',
                            'Credenciais incorrentas',
                            [
                                { text: 'Cancel' },
                                { text: 'OK' }
                            ],
                            { cancelable: false }
                        )
                    }
                }
            })
            .catch((error) => {
                dispatch(loginFailure())
                Alert.alert(
                    'Erro',
                    'Não há conexão com o servidor',
                    [
                        { text: 'Cancelar' },
                        { text: 'OK' }
                    ],
                    { cancelable: false }
                )
            })
    }
}
export function loginRequest (email, password) {
    return {
        type: LOGIN_REQUEST,
        payload: { email, password }
    }
}
export function loginSuccess (email, response) {
    return (dispatch) => {
        AsyncStorage.setItem('@Dropbox:token', response.access_token)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { email, response }
        })
        Actions.home()
    }
}
export function loginFailure () {
    return (dispatch) => {
        dispatch({
            type: LOGIN_FAILURE
        })
        Alert.alert(
            'Erro',
            'Houve uma falha no login! Verifique suas credenciais',
            [
                { text: 'Cancelar' },
                { text: 'OK' }
            ],
            { cancelable: false }
        )
    }
}

export function logout () {
    return (dispatch) => {
        if (removeToken()) {
            dispatch({
                type: LOGOUT_REQUEST
            })
            Actions.login()
        }
    }
}
async function removeToken () {
    try {
        await AsyncStorage.removeItem('@Dropbox:token')
        return true
    } catch (exception) {
        return false
    }
}
 */
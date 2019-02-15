import React, { Component } from 'react'
import { Root } from 'native-base'
import { Provider } from 'react-redux'
import configureStore from './app/store/configureStore'
import AppNavigator from './app/routes/AppNavigator'

const store = configureStore()

export default class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <Root>
                    <AppNavigator />
                </Root>
            </Provider>
        )
    }
}

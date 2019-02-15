import React, { Component } from 'react'
import { Router, Stack, Scene, Tabs } from 'react-native-router-flux'
import { connect } from 'react-redux'


import Login from '../screens/auth/Login'

class AppNavigator extends Component {
    render () {
        return (
            <Router>
                <Stack key='root' headerTintColor='#fff'>
                    <Scene key='login' hideNavBar component={Login} />
                </Stack>
            </Router>
        )
    }
}

export default connect(null, {})(AppNavigator)
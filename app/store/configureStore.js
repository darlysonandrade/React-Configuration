/* eslint-disable no-unused-vars */
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import ReduxThunk from 'redux-thunk'
import { appReducer } from '../index'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ })

export default function configureStore () {
    const enhancer = compose(
        composeWithDevTools(applyMiddleware(ReduxThunk, loggerMiddleware))
    )
    const store = createStore(appReducer, enhancer)

    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('../index').default
            store.replaceReducer(nextRootReducer)
        })
    }
    return store
}

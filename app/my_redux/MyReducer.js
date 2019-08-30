import { combineReducers } from 'redux'
import { firebaseStateReducer } from 'react-redux-firebase'
import auth from './reducers/auth.js';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    auth,
    firebase: firebaseStateReducer,
    // firestore: firestoreReducer,
    ...asyncReducers
  })
}

export default makeRootReducer

// Useful for injecting reducers as part of async routes
export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}



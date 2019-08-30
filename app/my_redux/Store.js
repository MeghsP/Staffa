import { applyMiddleware, compose, createStore } from 'redux';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import RNFirebase from 'react-native-firebase';
import thunk from 'redux-thunk';
import makeRootReducer from './MyReducer';

const reactNativeFirebaseConfig = {
  debug: true,
  apiKey: 'AIzaSyDkFMw475EaseNjcFdqWGWPBV16T8urC_s',
  authDomain: 'redux-firebasev3.firebaseapp.com',
  databaseURL: 'https://staffa-5e3a4.firebaseio.com/',
  projectId: 'staffa-5e3a4',
  storageBucket: 'gs://staffa-5e3a4.appspot.com/',
  messagingSenderId: '599464524772'
};
// for more config options, visit http://docs.react-redux-firebase.com/history/v2.0.0/docs/api/compose.html
const reduxFirebaseConfig = {
  // save users profiles to 'users' collection
  userProfile: 'users',
  useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
  enableLogging: false
};

export default (initialState = { firebase: {} }) => {
  // initialize firebase
  const firebase = RNFirebase.initializeApp(reactNativeFirebaseConfig);

  const middleware = [
     // make getFirebase available in third argument of thunks
    thunk.withExtraArgument({ getFirebase }),
  ];

  const store = createStore(
    makeRootReducer(),
    initialState, // initial state
    compose(
     reactReduxFirebase(firebase, reduxFirebaseConfig), // pass initialized react-native-firebase app instance
     applyMiddleware(...middleware)
    )
  )
  // store.firebaseAuthIsReady.then(() => {
  //   console.log('Auth has loaded') // eslint-disable-line no-console
  // })
  return store
}

// export default (initialState = { firebase: {} }) => {
//   // initialize firebase
//   const firebase = RNFirebase.initializeApp(reactNativeFirebaseConfig);

//   const middleware = [
//      // make getFirebase available in third argument of thunks
//     thunk.withExtraArgument({ getFirebase }),
//   ];

//   const createStoreWithFirebase = createStore(
//     makeRootReducer,
//     initialState,
//     compose(
//       reactReduxFirebase(firebase, reduxFirebaseConfig),
//       applyMiddleware(...middleware)
//     )
//   )

//   const store = createStoreWithFirebase(makeRootReducer, initialState)
//   // const store = createStore(
//   // // const store = createStoreWithFirebase(
//   //   makeRootReducer,
//   //   initialState, // initial state
//   //   compose(
//   //    reactReduxFirebase(firebase, reduxFirebaseConfig), // pass initialized react-native-firebase app instance
//     //  applyMiddleware(...middleware)
//   //   )
//   // )
//   store.firebaseAuthIsReady.then(() => {
//     console.log('Auth has loaded') // eslint-disable-line no-console
//   })
//   return store
// }

// // const createStore = (initialState = {}) => {
// //   // Initialize Firebase instance
// //   RNFirebase.initializeApp(reactNativeFirebaseConfig)

// //   // Add redux Firebase to compose
// //   // const createStoreWithFirebase = createStore(
// //   //   makeRootReducer,
// //   //   initialState,
// //   //   compose(
// //   //     reactReduxFirebase(RNFirebase, reduxFirebaseConfig)
// //   //   )
// //   // )

// //   // Create store with reducers and initial state
// //   const store = createStoreWithFirebase(rootReducer, initialState,
// //     compose(
// //       reactReduxFirebase(RNFirebase, reduxFirebaseConfig)
// //   ))

// //   // Listen for auth ready (promise available on store thanks to attachAuthIsReady: true config option)
// //   store.firebaseAuthIsReady.then(() => {
// //     console.log('Auth has loaded') // eslint-disable-line no-console
// //   })
// //   return store;
// // }
// // export default createStore;





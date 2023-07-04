import {call, put, takeLatest, takeLeading, select} from 'redux-saga/effects';
// import * as API from './api';
// import {logout, fetchSubscription as fetchSubscriptionAction} from './types';

// Handle login request.
function* signIn(action: any) {
  try {
    // const response = yield call(API.Login, action.payload);
    // if (response.success) {
    //   yield put({type: 'SIGN_IN_SUCCESS', payload: response.user});
    // } else {
    //   yield put({type: 'SIGN_IN_FAILURE', payload: response.message});
    // }
  } catch (e) {
    yield put({type: 'SIGN_IN_FAILURE', payload: e});
  }
}

// Handle user info request.
// function* setUser(action: any) {
//   try {
//     yield put({type: 'SET_USER', payload: action.payload});
//   } catch (e) {
//     yield put({type: 'SET_USER_ERROR', payload: e});
//   }
// }

// Listen to requests.
function* mySaga() {
  // User
  yield takeLatest('SIGN_IN', signIn);
  // yield takeLatest('SET_USER', setUser);

}

export default mySaga;

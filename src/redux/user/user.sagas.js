import {takeLatest, put, all, call} from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {googleSignInSuccess,googleSignInFailure} from './user.actions';

import {auth,googleProvider,createUserProfileDocument} from '../../firebase/firebase.utils';

export function* signInWithGoogle(){
  try{
   const {user} = yield auth.signInWithPopup(googleProvider);
   /*we use yield becasue we want to access the vaule that gets returned when the success happens
   with our signIn with popup*/
   const userRef = yield call(createUserProfileDocument,user);
   const userSnapshot = yield userRef.get();
   yield put(googleSignInSuccess({id:userSnapshot.id,...userSnapshot.data()}));
   /*put(), puts things back into our regular Redux flow*/
   /*saga don't dispatch actions using dispatch() keyword but it use put*/
  }catch(error){
    yield put(googleSignInFailure(error));
  }
}

export function* onGoogleSignInStart(){
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle)
}

export function* userSagas(){
  yield all([call(onGoogleSignInStart)]);
}
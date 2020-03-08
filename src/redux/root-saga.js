import {all,call} from 'redux-saga/effects';

import {fetchCollectionsStart} from './shop/shop.sagas';
import {userSagas} from './user/user.sagas';

export default function* rootSaga(){
  yield all([call(fetchCollectionsStart),call(userSagas)]);
  /*we use all() because we want all sagas to run on different task streams at once*/
}
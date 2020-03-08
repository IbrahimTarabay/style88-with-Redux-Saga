import ShopActionTypes from './shop.types';

import {firestore,convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () =>({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
})


/*when redux-thunk see that action not return object and it return a function
it detect it and will give the dispatch functionality as parameter so we can use it*/
export const fetchCollectionsStartAsync = () =>{
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());
    /*to switch isFetching to true*/
    
    /*collectionRef.get().then(snapshot => ....onSnapshot(async*/
    collectionRef
     .get()
     .then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      dispatch(fetchCollectionsSuccess(collectionsMap));
  }).catch(error => dispatch(fetchCollectionsFailure(error.messsage)));
      /*meaning that whenever the collectionRef updates
     or whenever this code run for first time will
    send us the snapshot representing collections objects array*/
 };
};

/*if redux-thunk middleware is enabled
any time you attempt to dispatch a function instead of and object,
 the middleware will call that function with dispatch method itself as the first argument*/
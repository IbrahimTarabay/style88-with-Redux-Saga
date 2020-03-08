import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import collection from '../pages/collection/collection';
/*we use firebase services*/ 

const config = {
    apiKey: "AIzaSyAlLVO-hsu4FUXiv3G5YlW3Iqx3_rouKpI",
    authDomain: "style88-db.firebaseapp.com",
    databaseURL: "https://style88-db.firebaseio.com",
    projectId: "style88-db",
    storageBucket: "style88-db.appspot.com",
    messagingSenderId: "716735589057",
    appId: "1:716735589057:web:61fa63117ae248392ec240",
    measurementId: "G-3DB9T40923"
  };/*object created from firebase to customize our application*/ 

  export const createUserProfileDocument = async (userAuth,additionalData) =>{/*userAuth is object return from auth library*/ 
    if(!userAuth) return;/*if user didn't sign in return nothing*/
     const userRef = firestore.doc(`users/${userAuth.uid}`);/*uid which in authentication library,users===collection*/ 
     const snapShot = await userRef.get();/*to get user object(data)*/

     if(!snapShot.exists){/*if user didn't exist in database*/ 
       const {displayName,email} = userAuth;
       const createdAt = new Date();

       try{/*create a new user object in Database*/ 
         await userRef.set({
           displayName,
           email,
           createdAt,
           ...additionalData
         })
       }catch(error){
         console.log('error creating user',error.message);
       }
     }
     return userRef;
  }

  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
      const {title,items} = doc.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    });

    return transformedCollection.reduce((accumulator,collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    },{});
  };/*to turn collection to object with key of title and value of array like 
  hats:{
    id: 1,
    title: 'Hats',
    routeName: 'hats',
    items: [....]*/

  /*firebase will always give us back the reference object and 
  snapshot object if nothing exists*/
  /*export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    /*with batch we want to make all requests happen as bundle so
    all newDocRef created with all objects*/
    /*objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      /*randomly generate unique id for me
      batch.set(newDocRef,obj);
    });
    return await batch.commit()
    /*to fire our batch request
  };*/
  /*we just use this commented code once to enter our collection data with no manual effort*/

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  /*we want to always trigger the google pop up when ever we use GoogleAuthProvider*/
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;
  /*in case we want the whole library*/ 
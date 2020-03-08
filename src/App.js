import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import CheckoutPage from './pages/checkout/checkout';

import Header from './components/header/header';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
/*import { selectCollectionsForPreview } from './redux/shop/shop.selectors';*/

class App extends React.Component {
  unsubscribeFromAuth = null; 
  
  componentDidMount(){
    const {setCurrentUser} = this.props;
    /*it's an open messaging system between app and firebase*/
    /*this connection is always open as long as our app component is mounted on dom*/ 
    /*we stored the user data in our database in firebase.utils.js
     but now we have to store that data in the "state" of our app so we can use it*/ 
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){/*if user signed in*/
        const userRef = await createUserProfileDocument(userAuth);
        /*we will get user object if he have object in database*/
        userRef.onSnapshot(snapShot =>{/*to get snapshot object(data of user) from that reference*/ 
           
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });/*this function like setState*/
        });
      }
      else{/*if user log out set currentUser to null*/ 
        setCurrentUser(userAuth);
      }
      /*addCollectionAndDocuments('collections',collectionsArray.map(({title,items}) =>
      ({title,items})))
      });*//*we just fire it once to enter shop data*/
    } 
  )}

  /*we have to close subscription when unmount because we don't want memory leaks in our js app
  related to listeners still being open even if the component that cares about the listener is no longer on the page*/
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    const {currentUser} = this.props;
    return (
      <div>
        <Header />
        {/*header out of the switch because we want it to display in all pages*/}
        {/*we pass currentUser to make header aware of user sign in or sign out*/}
        {/*The exact param disables the partial matching for a route and makes sure
         that it only returns the route if the path is an EXACT match to the current url*/}
        <Switch>{/*it allows for nested routes to work properly*/} 
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />

        <Route exact path='/signin' render={() =>
           currentUser ? 
           (<Redirect to='/' />):
           (<SignInAndSignUpPage/>)
           }
           />
        {/*render is js invocation that determines what component to return
         so it's in the same place of component but instead it will be some js*/}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  /*collectionsArray: selectCollectionsForPreview*/
});/*we use this function to be able to use currentUser state in code it's like this.state*/

const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
  /*dispatch() whatever you're passing object is going to be an action that i'm going to pass to every reducer*/
  /*the user will be then used as a payload*/
})
/*we use this function to be able to use setCurrentUser*/

export default connect(mapStateToProps,mapDispatchToProps)(App);

/*App component don't need currentUser anymore it's only setState it
so we will pass null as first argument*/

/*if we use currentUser state from user.reducer then we will replace null with mapStateToProps*/

/*whenever you dispatch, all reducers are called, which is why there is no relation between reducer and action
what matter is only the action type because reducer check this*/

/*Reducer check action type --> action type check action --> action give payload to reducer --> 
  reducer return the new state to store --> store pass new props to the component)*/
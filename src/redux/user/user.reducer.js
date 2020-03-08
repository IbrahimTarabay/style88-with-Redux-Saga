import {UserActionTypes} from './user.types';

const INITIAL_STATE = {
  currentUser: null
}/*like when we write this.state in constructor*/ 

const userReducer = (state=INITIAL_STATE,action)=>{/*we should set a specific action to return our new object*/
   switch(action.type){
     case UserActionTypes.SET_CURRENT_USER:
       return{
         ...state,
         currentUser: action.payload
       }/*we can't just modify like state.currentUser=action.payload because we must return new object to rerender*/
       default:
         return state;
   }
}

export default userReducer;
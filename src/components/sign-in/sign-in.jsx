import React from 'react';

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import {auth,signInWithGoogle} from '../../firebase/firebase.utils';

import './sign-in.scss';

class SignIn extends React.Component{
  constructor(props){
    super(props);

    this.state = {
       email: '',
       password: ''
    }
  }

  handleSubmit = async event =>{
    event.preventDefault();/*to have control and prevent default behavior*/
    const {email,password} = this.state;
    
    try{
      await auth.signInWithEmailAndPassword(email,password);
      /*if it succeed clear state*/
      this.setState({email: '',password:''});
    }catch(error){
      alert("Login failed wrong user credentials");
    } 
  }

  handleChange = event =>{
    const {value,name} = event.target;
    this.setState({[name]:value})/*[name] to dynamically work with any name*/ 
  }

  render(){
    return(
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
           name="email"
           type="email"
           label="Email"
           value={this.state.email}
            handleChange={this.handleChange}
             required />
    
          <FormInput 
          name="password" 
          type="password"
          label="Password"
           value={this.state.password}
            handleChange={this.handleChange}
             required />
          
          <div className='buttons'>
          <CustomButton type='submit'>Sign in {/*children*/}</CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>{/*isGoogleSignIn = true by default*/}
                  Sign in with Google
            </CustomButton> 
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
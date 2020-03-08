import React from 'react';

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import {auth,createUserProfileDocument} from '../../firebase/firebase.utils';

import './sign-up.scss';

class SignUp extends React.Component{
  constructor(){
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleSubmit = async event =>{
    event.preventDefault();
    const {displayName,email,password,confirmPassword} = this.state;
    if(password !== confirmPassword){
      alert("passwords don't match");
      return;
    }
    /*creates a new user account associated with the specified email and password,
     on successful creation, this user will also be signed in to your app,
      user account creation can fail if the account already exists or password is invalid*/ 
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email,password);
      await createUserProfileDocument(user,{displayName});
      /*object comes from firbase which has property displayName so we destructring*/

      this.setState({
        displayName:'',
        email: '',
        password:'',
        confirmPassword:''
      });/*to clear our form*/
    }catch(error){
       alert("please: "+error.message);
    }
  };

  handleChange = event =>{
    const {name,value} = event.target;
    this.setState({[name]:value});
    /*[name]: value to dynamically change the name*/
  }

  render(){
    const {displayName,email,password,confirmPassword} = this.state;
    return(
      <div className='sign-up'>
        <h2 className='title'>I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            handleChange={this.handleChange}
            label='Display Name'
            required
            >
           </FormInput>
           {/*email*/}
           <FormInput
            type='email'
            name='email'
            value={email}
            handleChange={this.handleChange}
            label='Email'
            required
            />
           {/*password*/}
           <FormInput
            type='password'
            name='password'
            value={password}
            handleChange={this.handleChange}
            label='Password'
            required
            />
           {/*confirm password*/}
           <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            handleChange={this.handleChange}
            label='Confirm Password'
            required
            />
            <CustomButton type='submit'>SIGN UP</CustomButton>
          </form>
         </div>
      )
    }
  }

  export default SignUp;
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';

import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';

import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import {HeaderContainer,LogoContainer,OptionsContainer,OptionLink} from './header.styles';

import style88 from '../../assets/style88.png';

const Header = ({currentUser,hidden}) =>(
    <HeaderContainer>
      <LogoContainer to="/">
       <img alt="style88" src={style88} style={{ height:100, width: 110 }} />
      </LogoContainer>
      <OptionsContainer>
          <OptionLink to='/shop'>
              SHOP
          </OptionLink>
          <OptionLink to='/shop'>
              CONTACT
          </OptionLink>
          {
            currentUser ?
            <OptionLink as='div' onClick={()=>auth.signOut()}>SIGN OUT</OptionLink>
            :
            <OptionLink to='/signin'>SIGN IN</OptionLink>
          }
          <CartIcon />
        </OptionsContainer>
        {hidden ? null : <CartDropdown />}
        {/*we move the functionality of the CartDropdown
        outside the header component and put it inside of global redux state*/}
      </HeaderContainer>
)

/*we can name this function anything but this the standard, state here indication for root state*/
/*
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,/*instead of currentUser: state.user.currentUser
  hidden/*instead of hidden: state.cart.hidden
});
*/

/*const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  hidden: selectCartHidden(state)  
});*/
/*instead of this we will use reateStructuredSelector*/

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})/*automatically pass the top level state*/

export default connect(mapStateToProps)(Header);
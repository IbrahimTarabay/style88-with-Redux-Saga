import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import style88 from '../../assets/style88.png';

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_4hTn9S93hiBKpYsxzBJHecbY002bdO9jrW';

  const onToken = token =>{
    console.log(token);
    alert('Payment Successful');
  }

  return(
    <StripeCheckout
       label='Pay Now'
       name='style88' 
       billingAddress
       shippingAddress
       image={style88}
       description={`Your total is $${price}`}
       amount={priceForStripe}
       panelLabel='Pay Now'
       token={onToken}
       stripeKey={publishableKey}
       />
    );
};

export default StripeCheckoutButton;
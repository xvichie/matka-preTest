import axios from 'axios';
import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout';


function CheckoutComponent() {

    const [product,setProduct] = useState({
        name:'Vip',
        price: 3
    })
    const priceForStripe = product.price * 100;

    const payNow = async token => {
      try {
        const res = await axios({
          url:'http://localhost:5000/api/payment',
          method:'POST',
          data:{
            amount:priceForStripe,
            token
          }
        })
        if(res.status === 200){
          console.log('Successful Payment');
        }
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <div className='CheckoutComponent'>
        <StripeCheckout
        stripeKey='pk_test_51JVgN2HEl82EEghgGHCRIsBHav1sJKc3f1f2Zi0qIyqy6Sz12tOi9AODRwIJbnsHMjtItxSQ8HBjlUHl3yVBHbLo00TAKsRChd'
        label='გადახდა'
        name='ბარათით გადახდა'
        token={payNow}
        ></StripeCheckout>
    </div>
  )
}

export default CheckoutComponent
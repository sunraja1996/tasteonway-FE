import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
import { env } from "../environment";
import {useDispatch} from "react-redux";
import {placeOrder} from "../Actions/orderAction"




function Checkout({ total, firstName }) {
  const dispatch = useDispatch()

  const handleToken = async (token) => {
    try {
      
      console.log(token);
      dispatch(placeOrder(token, total, firstName ))
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <StripeCheckout
         amount={total * 100}
         currency="INR"
         shippingAddress
         token={handleToken}
         billingAddress={false}
         stripeKey='pk_test_51MrMb6SG3cjw6IbEhOU9HKJUCv8SGJF9Sy9Y4Mtr52lscWDZ7Mnu1ipYh82hwG3Z6SUwc3V9FECvESVnalIiE94700fc9MNtFg'
        >
        <button type="button" className="btn btn-success btn-lg">
                PAY NOW
              </button>
        </StripeCheckout>
    </div>
  )
}

export default Checkout

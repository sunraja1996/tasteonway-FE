import axios from 'axios';
import { env } from '../environment';

export const placeOrder = (token, total, firstName) => async (dispatch, getState) => {
  dispatch({ type: 'PLACE_ORDER_REQ' });
  const cartItems = getState().cartReducer.cartItems;

  try {
    const res = await axios.post(`${env.apiurl}/order/placeorders`, { token, total, firstName, cartItems });
    console.log(res);

    dispatch({ type: 'PLACE_ORDER_SUCCESS', payload: res.data });
    console.log('PLACE_ORDER_SUCCESS');
  } catch (error) {
    dispatch({ type: 'PLACE_ORDER_FAIL', payload: error.res.data });
    console.log('PLACE_ORDER_FAIL');
  }
};



export const addtoCart =
  (pizzaburger, quantity, varient) => (dispatch, getState) => {
    const cartItem = {
      name: pizzaburger.name,
      _id: pizzaburger._id,
      image: pizzaburger.image,
      varient: varient,
      quantity: quantity,
      prices: pizzaburger.prices,
      price: pizzaburger.prices[0][varient] * quantity,
    };

    if (cartItem.quantity > 10) {
      alert("You can't add more than 10 Quantities");
    } else {
      if (cartItem.quantity <= 0) {
        dispatch({ type: "DELETE_FROM_CART", payload: pizzaburger });
      } else {
        dispatch({ type: "ADD_TO_CART", payload: cartItem });
      }
    }
    const cartItems = getState().cartReducer.cartItems;
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

export const deletefromCart = (pizzaburger) => (dispatch, getState) => {
  dispatch({ type: "DELETE_FROM_CART", payload: pizzaburger });
  const cartItems = getState().cartReducer.cartItems;
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
};

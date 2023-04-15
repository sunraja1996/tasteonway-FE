import React from "react";
import { useSelector, useDispatch } from "react-redux";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { addtoCart, deletefromCart } from "../Actions/cartActions";
import './CartPage.css'
import Checkout from "../Components/Checkout";


function CartPage() {
  const cartstate = useSelector((state) => state.cartReducer);
  const cartItems = cartstate.cartItems;
  const subTotal = cartItems.reduce((x, item) => x + item.price, 0);
  const tax = subTotal * 0.06;
  const deliverycharge = subTotal * 0.02;
  const Total = (subTotal + tax + deliverycharge).toFixed(2);

  const dispatch = useDispatch();

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <h2 style={{ fontSize: "35px" }}> My Cart </h2>
          <hr className="my-4" />

          {cartItems.map((item) => {
            const quantity = parseInt(item.quantity, 10);
            const varient = item.varient;
            return (
              <>
                <div className="row m-3 mb-4 d-flex justify-content-between align-items-center">
                  <div className="col-md-2 col-lg-2 col-xl-2">
                    <img
                      src={item.image}
                      className="img-fluid rounded-3"
                      alt="Cotton T-shirt"
                    />
                  </div>
                  <div className="col-md-3 col-lg-3 col-xl-3">
                    <h1>{item.name}</h1>
                    <h6>[{item.varient}]</h6>
                  </div>
                  <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                    <button
                      onClick={() => {
                        dispatch(addtoCart(item, quantity - 1, varient));
                      }}
                      style={{ color: "#367E18" }}
                      className="btn btn-link px-2"
                    >
                      <RemoveCircleOutlineIcon />
                    </button>
                    <h3>{quantity}</h3>
                    <button
                      onClick={() => {
                        dispatch(addtoCart(item, quantity + 1, varient));
                      }}
                      style={{ color: "#367E18" }}
                      className="btn btn-link px-2"
                    >
                      <ControlPointIcon />
                    </button>
                  </div>
                  <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                    <h4 className="mb-0">
                      {quantity}*{item.prices[0][item.varient]} = {item.price}
                    </h4>
                  </div>
                  <button
                    onClick={() => {
                      dispatch(deletefromCart(item));
                    }}
                    style={{ color: "#fa0606" }}
                    className="col-md-1 col-lg-1 col-xl-1 btn btn-link px-2"
                  >
                    <DeleteForeverIcon />
                  </button>
                </div>
                <hr className="my-4" />
              </>
            );
          })}
        </div>

        <div className="col-md-4 Cart-Total">
          <div className="card mb-4">
            <div className="card-header py-3">
              <h5 style={{ color: "#fa0606" }} className="mb-0">Total</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  SubTotal
                  <span>&#8377;{subTotal}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Tax (6%)
                  <span>&#8377;{tax.toFixed(2)}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Delivery Charges (2%)
                  <span>&#8377;{deliverycharge}</span>
                </li>

                <hr className="my-4" />
                
                <li style={{ color: "#fa0606" }} className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total amount</strong>
                    <strong>
                      <p className="mb-0">(including TAX)</p>
                    </strong>
                  </div>
                  <span>
                    <strong>&#8377;{Total}</strong>
                  </span>
                </li>
              </ul>

              <Checkout total = {Total}/>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <h6 className="mb-0">
            <a href="/" className="text-body">
              {" "}
              <KeyboardBackspaceIcon />
              Back to Home
            </a>
          </h6>
        </div>
      </div>
    </div>
  );
        }


export default CartPage;

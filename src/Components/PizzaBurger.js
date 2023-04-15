import React, { useState } from "react";
import "./PizzaBurger.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useSelector, useDispatch} from 'react-redux';
import { addtoCart } from "../Actions/cartActions";

function PizzaBurger({pizzaburger}) {

  const [quantity, setQuantity] = useState(1);
  const [varient, setVarient] = useState('small')
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch()

  function addtocart() {
      dispatch(addtoCart(pizzaburger, quantity, varient))
  }


  return (
    <div className="m-1 p-3 mb-5 bg-pbc-custom rounded">
      <div className="container" onClick={handleShow}>
        <h1>{pizzaburger.name}</h1>
        <img
          src={pizzaburger.image}
          className="img-fluid img-pizzaburger"
          alt=""
        ></img>
      </div>

      <div className="flex-container">
        <div className="m-1 w-100">
          <p>Variants</p>
          <select
            className="form-control"
            value={varient}
            onChange={(e) => {
              setVarient(e.target.value);
            }}
          >
            {pizzaburger.varients?.map((vari, index) => {
              return (
                <option key={index} value={vari}>
                  {vari}
                </option>
              );
            })}
          </select>
        </div>
        <div className="m-1 w-100">
          <p>Quantity</p>
          <select
            className="form-control"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          >
            {[...Array(10).keys()].map((x, i) => {
              return (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex-container">
        <div className="m-1 w-100">
          <h4 className="mt-1">
            Price : &#8377;{pizzaburger.prices[0][varient] * quantity}
          </h4>
        </div>
        <div className="m-1 w-100">
          <button
            className="btn pbc-btn"
            type="button"
            onClick={addtocart}
          >
            <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{pizzaburger.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={pizzaburger.image}
            alt=""
            style={{ height: "400px", width: "470px", objectFit: "cover" }}
          ></img>
          <p>{pizzaburger.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PizzaBurger;

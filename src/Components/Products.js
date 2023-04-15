import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import Table from "react-bootstrap/esm/Table";
import { useNavigate } from "react-router-dom";
import { env } from "../environment";
import axios from "axios";

function Products( {allpro} ) {

  
  const [pro, setPro] = useState(null);
  const navigate = useNavigate();


  const deletepro = async (id) => {
    const token = sessionStorage.getItem("token");
  
    if (token) {
      const res = await axios.delete(`${env.apiurl}/pizzaburgers/delete-product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (res.status === 200) {
        console.log(res.pro.message);
        setPro(prevState => prevState && prevState.filter((e) => e._id !== id));
        window.location.reload();
      } else {
        console.log(res.pro.message);
      }
    } else {
      console.log("No Token Found");
      setTimeout(() => {
        logout();
      }, 3000);
    }
  };

  useEffect(() => {
    const getPizzas = async () => {
      try {
        const res = await axios.get(
          `${env.apiurl}/pizzaburgers/getallpizzaburgers`
        );
        setPro(res.data.pizzaburger);
        console.log(res.data.pizzaburger);
      } catch (error) {
        console.log(error);
      }
    };
    setPro(getPizzas);
  }, []);
  
  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };


  return (
<>

<Table className="table table-hover table-dark table-fixed">
  <thead>
    <tr>
      <th style={{width:"400px"}} scope="col">Name</th>
      <th scope="col ">Image</th>
      <th scope="col">Small</th>
      <th scope="col">Medium</th>
      <th scope="col">Large</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{allpro.name}</td>
      <td><img
            style={{width:"100px", height:"100px", objectFit:"cover"}}
          src={allpro.image}
          className="img-fluid img-allpro"
          alt=""
        ></img></td>
        {allpro.varients.map((varient, index) => (
          <td key={index}>
            {allpro.prices[0][varient] ? 
            <>&#8377;{allpro.prices[0][varient]}</> : 
            <>N/A</>}
          </td>
        ))}
      <td style={{width:"150px"}}>
  <Button className='m-1' variant='danger'
  onClick={() => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${allpro.name}?`
    );
    if (confirmDelete) {
      deletepro(allpro._id);
    }
  }}>
    <DeleteIcon/>
  </Button></td>
    </tr>
  </tbody>
</Table>



{/* <div className="m-1 p-3 mb-5 bg-pbc-custom rounded">

<div className="container">
        <h6>{allpro.name}</h6>
        <img
          src={allpro.image}
          className="img-fluid img-allpro"
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
          {allpro.varients?.map((vari, index) => {
            return (
              <option key={index} value={vari}>
                {vari}
              </option>
            );
          })}
        </select>
      </div>
    </div>
    <div className="flex-container">
      <div className="m-1 w-100">
        <h4 className="mt-1">
          Price : &#8377;{allpro.prices[0][varient]}
        </h4>
      </div>
      <Button className='m-1' variant='warning'>
    <EditIcon/>
  </Button> &nbsp;
  <Button className='m-1' variant='danger'>
    <DeleteIcon/>
  </Button>
    </div>
    </div> */}

</>
  )
}

export default Products
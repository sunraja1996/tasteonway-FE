import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import PreviewIcon from '@mui/icons-material/Preview';
import Allusers from '../Components/Allusers';
import AllProducts from '../Components/AllProducts';
import Addusers from '../Components/Addusers';
import AddProducts from '../Components/AddProducts';


function Dashboard() {

  
  const navigate = useNavigate()

  const [displayAllUser, setDisplayAllUser] = useState(false);
  const [displayAllProducts, setDisplayAllProducts] = useState(false);
  const [displayAddUser, setDisplayAddUser] = useState(false);
  const [displayAddProducts, setDisplayAddProducts] = useState(false);


  const handleViewProducts = () => {
    setDisplayAllProducts(true);
    setDisplayAddUser(false);
    setDisplayAllUser(false);
    setDisplayAddProducts(false);
  }

  const handleAdduser = () => {
    setDisplayAddUser(true);
    setDisplayAllProducts(false);
    setDisplayAllUser(false);
    setDisplayAddProducts(false)
  }

  const handleViewUsers = () => {
    setDisplayAllProducts(false);
    setDisplayAddUser(false);
    setDisplayAllUser(true);
    setDisplayAddProducts(false)
  }

  const handleAddProduct = () => {
    setDisplayAllProducts(false);
    setDisplayAddUser(false);
    setDisplayAllUser(false);
    setDisplayAddProducts(true)
  }



  let logout = () => {
    sessionStorage.clear()
    navigate('/')
  }


  return (
    <div>
      <h1 className='p-2' style={{"textAlign" : "center", backgroundColor:"green", color:"whitesmoke"}}> Admin Dashboard </h1>

      <div style={{"textAlign" : "center"}} className='add-user'>
        <Button className='m-1' variant="dark" onClick={handleViewUsers}><PersonOutlineIcon/> User</Button> &nbsp;
        <Button className='m-1' variant="info" onClick={handleAdduser}><PersonAddIcon/> Add User</Button> &nbsp;
        <Button className='m-1' variant="warning" onClick={handleAddProduct}><AddIcon/>  Add Product</Button> &nbsp;
        <Button className='m-1' variant="success" onClick={handleViewProducts}><PreviewIcon/> View Product</Button> &nbsp;
        <Button className='m-1' variant="danger" onClick={()=>logout()} ><LogoutIcon/></Button>
      </div>
      

      {displayAllUser && <Allusers handleViewUsers={handleViewUsers}/>}
      {displayAllProducts && <AllProducts handleViewProducts={handleViewProducts}/>}
      {displayAddUser && <Addusers handleAdduser={handleAdduser}/>}
      {displayAddProducts && <AddProducts handleAddProduct={handleAddProduct}/>}

    </div>
  )
}

export default Dashboard
import React from 'react'
import './Register.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Loading from "../Components/Loading";


import{env} from '../environment'

function Register() {


let [firstName, setFirstName] = useState("")
    let [lastName, setLastName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    const [isinval, setIsVal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSucess] = useState(true);
    let navigate = useNavigate()
    

    
    const login = async(e)=>{
        e.preventDefault(); // Prevent default form submission behavior
        console.log({email, password});
        try {
          let res = await axios.post(`${env.apiurl}/users/signup`, {email, password, firstName, lastName})
          if(res.data.statusCode === 200)
        {
            sessionStorage.setItem('email', email)
            console.log(res.data);
            setIsSucess(true);
            setTimeout(() => navigate('/login'), 500);

        }else 
        if(res.data.statusCode === 400){
          setIsVal(true);
          setTimeout(() => navigate('/login'), 500);
        }
        else
        {
            return res.data.message
        }
        } catch (error) {
          setIsError(true);
      console.error(error);
        }finally {
          setIsLoading(false);
        }
        
    }
  return (
    <>
     {!isSuccess ? (
        
        <Alert>
          Registered Successfully
        </Alert>

      )  :  isinval ? (
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="warning">
               <strong> User Already Exists </strong>
            </Alert>
        </Stack>
      ) : isError ? (
        <Alert severity="error">
        This is an error alert — <strong>check it out!</strong>
      </Alert>
      ) : !isLoading ? (
        <Loading/>
      ) : (
    <section className="vh-100">
  <div className="container h-90">
    <div className="row d-flex justify-content-center align-items-center h-90">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius:'25px'}}>
          <div className="card-body p-md-3">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-3">

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text"   placeholder='Firstname' className="form-control" id="firstname" onChange={(e) => setFirstName(e.target.value) } />

                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" placeholder='Lastname' className="form-control"  id="lastname"  onChange={(e) => setLastName(e.target.value) }/>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" placeholder='Email' className="form-control" id="username" onChange={(e) => setEmail(e.target.value) } />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" placeholder='Password' className="form-control"  id="password" autocomplete="on" onChange={(e) => setPassword(e.target.value) }/>

                    </div>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" className="btn btn-danger btn-lg" onClick={(e) => login(e)}>Register</button>
                  </div>

                </form>

                <a className="btn btn-warning nav-link mb-2 p-2" href="/login">
      Already User? Sign in
    </a>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://images.unsplash.com/photo-1615887087343-6a32f45f27a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                  className="img-fluid" alt=""/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      )}

</>
  )
}

export default Register
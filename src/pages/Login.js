import React from 'react'
import './Login.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import{env} from '../environment'
import Alert from '@mui/material/Alert';


function Login() {

    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    const [isSuccess, setIsSuccess] = useState(true);
    const [isinval, setIsInVal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    let navigate = useNavigate()


    const login = async(e)=>{
      e.preventDefault();
        console.log({email, password});
        
      try {
        let res = await axios.post(`${env.apiurl}/users/login`, {email, password})
        if(res.data.statusCode === 200)
        {
                          
      sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('firstName', res.data.firstName);
console.log(sessionStorage.getItem('firstName')); // Add this line to check if firstName is being properly set

      
      console.log(res.data.token, res.data.firstName);


      if (res.data.role === "admin") {
        navigate('/dashboard');
        console.log(res.data.role);

      } if (res.data.role === "user") {
        setIsSuccess(true);
        console.log(res.data.role);
        setTimeout(() =>  navigate('/'), 1000);
      }  
      else
      setIsError(true);
      console.error(isError); 
      }  
      else{
        setIsInVal(true);
        }
      } 
      catch (error) {
        setIsError(true);
        console.error(error);
      }
      finally {
        setIsLoading(false);
      }

    }


  return (
    <>
    {
      !isSuccess ? (
        
        <Alert severity="success">
          Login Successfull
        </Alert>

      ) : isinval ? (
        <Alert severity="warning">
               <strong> Invalid Crediantials </strong>
            </Alert>
      ) : (
        <section className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img src='https://images.unsplash.com/photo-1530554764233-e79e16c91d08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
          className="img-fluid" alt="Phone image"/>
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <form>

            <h1 style={{textAlign:'center'}}>LOGIN </h1>

          <div className="form-outline mb-4">
            <input type="email" placeholder='Email' className="form-control form-control-lg" id="username" onChange={(e) => setEmail(e.target.value) } />

          </div>

          <div className="form-outline mb-4">
            <input type="password" placeholder='Password' className="form-control form-control-lg" id="password" autocomplete="on" onChange={(e) => setPassword(e.target.value) } />

          </div>

       


          <button onClick={(e) => login(e)}  type="submit" style={{backgroundColor: '#367E18'}} className="btn btn-lg text-light">Sign in</button>

          <a className="btn btn-warning nav-link mt-2 p-2" href="/register">
      New User? Create an Account
    </a>

        </form>
      </div>
    </div>
  </div>
</section>
  )
    }
    </>
    
  )
}

export default Login
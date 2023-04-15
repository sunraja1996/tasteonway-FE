import React from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import error from '../Assests/error.gif'

function Error() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <img style={{height:'250px', width:'250px'}} src={error} alt='Error 404' />

        <Alert severity="error">
  <AlertTitle>404 Error</AlertTitle>
  Something Went Wrong <strong>check it out!</strong>
</Alert>
    </div>
  )
}

export default Error
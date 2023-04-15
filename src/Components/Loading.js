import React from 'react'
import load from '../Assests/pizza-slice-loader-1.gif'

function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">

        <img style={{height:'250px', width:'250px'}}  src={load} alt="loading..." />

    </div>
  )
}

export default Loading
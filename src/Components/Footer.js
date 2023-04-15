import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleIcon from '@mui/icons-material/Google';


function Footer() {
  return (
    <div>
        <footer class="text-center text-white" style={{backgroundColor:"#f1f1f1"}}>
  <div class="container pt-4">
    <section class="mb-4">

      <a
        class="btn text-white btn-floating m-1"
        href="/"
        style={{backgroundColor:"#dd4b39"}}
        >
      <GoogleIcon/>
      </a>

      <a
       class="btn text-white btn-floating m-1"
       href="/"
       style={{backgroundColor:"#0082ca"}}
      >
      <LinkedInIcon />
      </a>


      <a
        class="btn text-white btn-floating m-1"
        href="/"
        style={{backgroundColor:" #333333"}}>
      <GitHubIcon/>
      </a>
    </section>
  </div>

  <div class="text-center text-dark p-3" style={{backgroundColor:"rgb(0, 0 ,0 , 0.2"}}>
    © 2023 Copyright:
    <a class="text-dark" href="shanmugaraja-3108.in">Shanmugaraja Gajendran</a>
  </div>
</footer>
    </div>
  )
}

export default Footer
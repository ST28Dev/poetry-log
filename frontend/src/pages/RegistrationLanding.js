import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect} from 'react'

function RegistrationLanding() {
  const navigate = useNavigate()
  
  let [redirectTime,setRedirectTime] = useState(15)

  const {user} = useSelector((state)=>state.auth)

  useEffect(()=>{
    const countdown = setInterval(()=>{
      redirectTime > 0 ? setRedirectTime(redirectTime-1) : setRedirectTime(0)
    }, 1000)

    if(redirectTime === 0){
      navigate("/login")
    }
    return ()=>{
      clearInterval(countdown)
    }
  },[redirectTime])

  useEffect(()=>{
    if(!user){
      console.log("Not user")
    }
    else{
      navigate('/home')
    }
  },[])


  return (
    <div className='my-3 mb-4'>
      <div className='verification-landing-container'>
        <div className='alert alert-success'>
          <h1 className='text-center font_mukta mb-3'>
            Congratulations! You've created an account.
          </h1>

          <h5 className='font_lato text-center mb-4'>
            Before you can log in, however, you'll need to verify your account using the email you have provided in the registration.
          </h5>
          <h5 className='font_lato text-center mb-4'>
            An email with a verification link has been sent to the email you indicated in your registration.
          </h5>
          <h5 className='font_lato text-center mb-4'>
            If you need another email, just try to log in with your account credentials (either using username or email), and another email will be sent accordingly.
          </h5>

        </div>
        <div>
          <h5 className='font_lato text-center mb-3'>
            We hope you enjoy your stay at <span className='fw-bold'>PoetryLog</span>!
          </h5>
        </div>
        <div>
          <h5 className='text-center font_lato mb-3'>This page will automatically redirect you to the login page.</h5>
          <h5 className='text-center font_lato'>Redirecting in <span className='fw-bold'>{redirectTime} second(s)</span>...</h5>
        </div>
      </div>

    </div>
  )
}

export default RegistrationLanding
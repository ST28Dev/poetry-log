import React from 'react'
import {useState,useEffect} from "react"
//useSelector => select something from the state in a slice
//useDispatch => evoke a function from a slice
import {useSelector, useDispatch} from "react-redux"

//useNavigate => redirect users to specific pages
import { useNavigate} from 'react-router-dom'

import {login,reset} from "../features/auth/authSlice"

function Login() {
    const [formData,setFormData] = useState({
        email: "",
        password: "",
        username: ""
    })

    const {email,password,username} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading,isError,isSuccess,message} = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(isError){
            document.querySelector("#error_message_container").removeAttribute("hidden")
            document.querySelector("#error_message").innerText = message           
        }
        
        if(isSuccess && (user && user.verified)){
            navigate("/home")
        }

        dispatch(reset())
    },[user,isError,isSuccess,message,navigate,dispatch])

    const updateFormData = (e)=>{
        setFormData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    const submitEmail = (e)=>{
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    const submitUsername = (e)=>{
        e.preventDefault()

        const userData = {
            username,
            password
        }

        dispatch(login(userData))
    }

    const toggleEmailLogin = (e)=>{
        [...document.querySelectorAll("div#login_toggle_buttons>button")].map((item)=>item.classList.remove("active"))
        e.target.classList.add("active")

        const emailContainer = document.querySelector("#email_login_container")
        emailContainer.classList.remove("d-none")
        

        const usernameContainer = document.querySelector("#username_login_container")
        usernameContainer.classList.add("d-none")
    }

    const toggleUsernameLogin = (e)=>{
        [...document.querySelectorAll("div#login_toggle_buttons>button")].map((item)=>item.classList.remove("active"))
        e.target.classList.add("active")

        const emailContainer = document.querySelector("#email_login_container")
        emailContainer.classList.add("d-none")
        
        const usernameContainer = document.querySelector("#username_login_container")
        usernameContainer.classList.remove("d-none")
    }
    
    // toggleEmailLogin

    return (
        <div className='p-4' id="login_main_container">
            <div id="login_heading" className='p-3'>
                <div>
                    <h1 className='text-center font_labrada '>Welcome to PoetryLog!</h1>
                    <h5 className='text-center text-secondary font_lato mb-3'>Login to write and share your poems </h5>
                </div>
                <div>
                    <div className="d-flex flex-column justify-content-center flex-sm-row" id="login_toggle_buttons" >
                        <button onClick={toggleEmailLogin} className='btn btn-small btn-primary font_mukta active mb-2 me-sm-2 mb-sm-0'>Login by Email</button>
                        <button onClick={toggleUsernameLogin} className='btn btn-small btn-primary font_mukta'>Login by Username</button>
                    </div>
                </div>
            </div>

            <div id="login_container" className='d-flex justify-content-center mb-4'>
                <div id="email_login_container" className='p-3'>
                    <form onSubmit={submitEmail}>
                        <input type="email" name="email" id="email" placeholder='Email' onChange={updateFormData} required className=' form-control font_lato border-dark mb-3'></input>
                        <div>
                        <input type="password" name="password" placeholder='Password' onChange={updateFormData} required className='mb-4 form-control font_lato border-dark password'></input>
                        </div>
                        <div className='d-flex flex-column flex-md-row mt-2'>
                            <button type='submit' className='btn btn-lg border-dark btn-light font_mukta mb-2 mb-md-0 me-md-3'>Login</button>
                            
                            <button onClick={()=>{
                                navigate("/reset_password")
                            }} className='btn btn-lg border-dark btn-light font_mukta'>Forgot Password</button>
                        </div>
                    </form>
                </div>

                <div id="username_login_container" className='d-none p-3'>
                    <form onSubmit={submitUsername}>
                        <input type="text" name="username" id="username" placeholder='Username' onChange={updateFormData} required className='mb-3 form-control font_lato border-dark'></input>
                        <input type="password" name="password" placeholder='Password' onChange={updateFormData} required className='mb-4 form-control font_lato border-dark password'></input>
                        <div className='d-flex flex-column mt-2 flex-md-row'>
                            <button type='submit' className='btn btn-lg border-dark btn-light font_mukta mb-2 mb-md-0 me-md-3'>Login</button>
                            
                            <button onClick={()=>{
                                navigate("/reset_password")
                            }} className='btn btn-lg border-dark btn-light font_mukta'>Forgot Password</button>
                        </div>
                    </form>
                </div>
                
            </div>

            

            <div className='alert alert-danger' id="error_message_container" hidden>
                <h3>Error:</h3>
                <h3 className="text-center fw-normal" id="error_message"></h3>
            </div>
        </div>
    )
}

export default Login
import React from 'react'

//useSelector => select something from the state in a slice
//useDispatch => evoke a function from a slice
import {useSelector, useDispatch} from "react-redux"

//useNavigate => redirect users to specific pages
import { useNavigate} from 'react-router-dom'
import {useState, useEffect} from "react"

import {register,reset} from "../features/auth/authSlice"

function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: ""
    })

    const {email,password,username} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError,isSuccess,message} = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(isError){
            document.querySelector("#error_message_container").removeAttribute("hidden")
            document.querySelector("#error_message").innerText = message    
        }
        
        if(isSuccess || user){
            document.querySelector("#error_message").innerText = ""
            navigate("/register/success")
        }

        dispatch(reset())
    },[user,isError,isSuccess,message,navigate,dispatch])

    const updateFormData = (e)=>{
        setFormData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    const submit = (e)=>{
        e.preventDefault()

        //validate email by making sure it is a gmail email
        const emailRegex = /^[A-Za-z0-9]+(\.[A-Za-z0-9]+){0,}@gmail.com$/g

        const match = emailRegex.test(email)
        if(match){

            //check password strength
            if(password.length < 6) {
                document.querySelector("#error_message_container").removeAttribute("hidden")
                document.querySelector("#error_message").innerText = "Password is not strong enough. It is less than 6 characters. Try again."
                return
            }

            const passRegex = /(.*[A-Z0-9].*[A-Z0-9].*[A-Z0-9].*[A-Z0-9].*)/g

            const validPass = (password.match(/[A-Z]/g) && password.match(/[A-Z]/g).length >= 1) && (password.match(/\d/g) && password.match(/\d/g).length >= 2)
            if(validPass){
                const userData ={
                    email,
                    password,
                    username
                }
        
                dispatch(register(userData))
                return
            }
            document.querySelector("#error_message_container").removeAttribute("hidden")
            document.querySelector("#error_message").innerText = "Password is not strong enough. It does not have 2 uppercase letters, and 2 numerical digits. Try again."
            
        }
        else{
            document.querySelector("#error_message_container").removeAttribute("hidden")
            document.querySelector("#error_message").innerText = "Email must be a gmail address in the format: email@gmail.com"
        }

        
    }
    return (
        <div className='my-2 p-3' id="register_container">
            <h1 className='text-center font_labrada'>Create An Account</h1>
            <h5 className='text-center text-secondary font_lato mb-3'>Start Writing Poems Today!</h5>

            <div className='form mx-4 my-4'>
                <h6 className='text-secondary fw_mukta my-4'>NOTE: As of current, PoetryLog only accepts gmail accounts for registration. Please register with a gmail account.</h6>
                <form onSubmit={submit} className="form-group">
                    <label className='h5 font_labrada'>Email <span className='text-danger'>(required)* </span>:</label>
                    <input className="form-control font_lato" type="email" id="email" name="email" value={email} placeholder="Email" onChange={updateFormData} required></input><br />
                    
                    <label className='h5 font_labrada'>Username <span className='text-danger'>(required)* </span>:</label>
                    <input className="form-control font_lato" type="text" id="username" value={username} name="username"
                    onChange={updateFormData} placeholder="Username" required></input>
                    <br />

                    <label className='h5 font_labrada'>Password <span className='text-danger'>(required)* </span>:</label>
                    <input className="form-control font_lato" type="password" value={password} name="password"
                    onChange={updateFormData} placeholder="Password" required></input>
            

                    <div className='mt-3'>
                        <ul className='mb-3 font_mukta p-0 ps-4'>
                            <li>At least 6 characters</li>
                            <li>At least one uppercase letter [A-Z]</li>
                            <li>At least two numerical digits [0-9]</li>
                        </ul>
                    </div>

                    <div className='d-flex justify-content-center'>
                        <button className="btn btn-lg btn-light border-dark form-control font_mukta" type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <div className='alert alert-danger' id="error_message_container" hidden>
                <h3>Error:</h3>
                <h3 className="text-center fw-normal" id="error_message"></h3>
            </div>
        </div>
    )
}

export default Register
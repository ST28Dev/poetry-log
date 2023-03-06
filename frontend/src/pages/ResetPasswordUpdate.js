import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function ResetPasswordUpdate() {
    const [password,setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const {id,token} = useParams()

    const navigate = useNavigate()
    const submitNewPassword = async()=>{
        if(password===passwordConfirm){
            //validate password strength
            //check password strength
            if(password.length < 6) {
                document.querySelector("#reset_password_update_error").classList.remove("d-none")
                document.querySelector("#reset_password_update_error_message").innerText = "Password is not strong enough. It is less than 6 characters. Try again."
                return
            }

            const validPass = (password.match(/[A-Z]/g) && password.match(/[A-Z]/g).length >= 1) && (password.match(/\d/g) && password.match(/\d/g).length >= 2)
            if(validPass){
                try {
                    const response = await axios.post(`/users/reset_password/${id}/${token}`,{
                        password
                    })
    
                    document.querySelector("#reset_password_update_success").classList.remove("d-none")
    
                    const elems = [...document.querySelectorAll(".disable-on-success")]
                    elems.map((elem)=>{
                        return elem.setAttribute("disabled",true)
                    })
                    
                    const timeout = setTimeout(()=>{
                        navigate("/login")
    
                        return clearTimeout(timeout)
                    },5000)
                } catch (error) {
                    console.log(error)
                    document.querySelector("#reset_password_update_error_message").innerText = "Your session has expired, or there is an internal server error. Request another reset password email or try again at a later time."
    
                    document.querySelector("#reset_password_update_error").classList.remove("d-none")
    
                    const timeout = setTimeout(()=>{
                        document.querySelector("#reset_password_update_error").classList.add("d-none")
    
                        return clearTimeout(timeout)
                    },5000)
                }
            }
            else{
                document.querySelector("#reset_password_update_error").classList.remove("d-none")
                document.querySelector("#reset_password_update_error_message").innerText = "Password is not strong enough. It does not have 2 uppercase letters, and 2 numerical digits. Try again."

                const timeout = setTimeout(()=>{
                    document.querySelector("#reset_password_update_error").classList.add("d-none")

                    return clearTimeout(timeout)
                },5000)
            }    

            
        }
        else{
            document.querySelector("#reset_password_update_error_message").innerText = "Passwords do not match. Try again."
            document.querySelector("#reset_password_update_error").classList.remove("d-none")
            // reset_password_update_error

            const timeout = setTimeout(()=>{
                document.querySelector("#reset_password_update_error").classList.add("d-none")

                return clearTimeout(timeout)
            },5000)
        }
    }
    return (
        <div className='p-3'>
            <header>
                <h1>Enter A New Password</h1>
            </header> 

            <section className='mb-3'>
                <h5 className='fw-normal font_lato mb-3'>
                    Please enter a new password.
                </h5>
                <form className='mb-3'>
                    <div className='mb-2'>
                        <label htmlFor='new_password' className='font_lato mb-1 fw-normal fs-5'>New Password: <span className='text-danger'>*</span></label>
                        <input required className="form-control p-2 disable-on-success" type="password" placeholder='Password' onChange={(e)=>{
                            e.preventDefault()
                            setPassword(e.target.value)
                        }}></input>
                    </div>
                    
                    <div >
                        <label htmlFor='new_password_confirm' className='font_lato mb-1 fw-normal fs-5'>Confirm Password: <span className='text-danger'>*</span></label>
                        <input required className="form-control p-2 disable-on-success" type="password" placeholder='Confirm Password' onChange={(e)=>{
                            e.preventDefault()
                            setPasswordConfirm(e.target.value)
                        }}></input>
                    </div>
                </form>
                <button onClick={submitNewPassword}className='btn btn-primary disable-on-success'>
                    Submit
                </button>
            </section>

            <section id="reset_password_update_success" className='d-none'>
                <div className='alert alert-success'>
                    <h1>Success.</h1>
                    <h5 className='fw-normal font_lato'>Your password has been successfully reset. You will login in the future using the new password you have set. You will soon be redirected to the login page to log into your account using this new password.</h5>
                </div>
            </section>

            <section id="reset_password_update_error" className='d-none'>
                <div className='alert alert-danger'>
                    <h1>Error Occurred.</h1>
                    <h5 className='fw-normal font_lato' id="reset_password_update_error_message"></h5>
                </div>
            </section>
        </div>
  )
}

export default ResetPasswordUpdate
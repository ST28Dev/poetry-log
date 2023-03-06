import axios from 'axios'
import React, { useState } from 'react'

function ResetPasswordForm() {
    const [email,setEmail] = useState("") 

    const enableForm = ()=>{
        document.querySelector("#reset_password_email_input").removeAttribute("disabled")
                
        document.querySelector("#reset_password_submit_button").removeAttribute("disabled")
    }
    const submitForm = async ()=>{
        document.querySelector("#reset_password_email_input").setAttribute("disabled",true)
            
        document.querySelector("#reset_password_submit_button").setAttribute("disabled",true)

        try {
            const response = await axios.post("/users/reset_password",{
                email
            })
    
            document.querySelector("#reset_email_send_success").classList.remove("d-none")
    
            // reset_password_submit_button
            const timeout = setTimeout(()=>{
                document.querySelector("#reset_email_send_success").classList.add("d-none")
    
                enableForm()

                return clearTimeout(timeout)
            },5000)
        } catch (error) {
            document.querySelector("#reset_email_send_error").classList.remove("d-none")
    
            const timeout = setTimeout(()=>{
                document.querySelector("#reset_email_send_error").classList.add("d-none")
    
                enableForm()

                return clearTimeout(timeout)
            },5000)
        }


    }
  return (
    <div className='p-3'>
        <header>
            <h1 className='font_mukta'>Forgot Password</h1>
        </header>
        <section>
            <p className='font_lato'>
                Forgot your password? No problem! You can reset your password by providing the email address you registered with on the platform. We will then send you an email with a corresponding one-time password reset link. 
            </p>
            <p className='fw-bold font_lato'>
                (NOTE: There is a delay of 5 seconds before you can send another email after the initial one. This is to prevent accidentally sending too many emails, and flooding your inbox.)
            </p>
        </section>
        <section>
            <label htmlFor='email'>Email:</label>
            <input id="reset_password_email_input" className="form-control reset-form-input" type='email' required placeholder="(e.g: johndoe@gmail.com)" onChange={(e)=>{
                e.preventDefault()
                setEmail(e.target.value)
            }}></input>
            <button id="reset_password_submit_button" onClick={submitForm} className='btn my-2 btn-primary'>Submit</button>
        </section>
        
        <section id="reset_email_send_success" className='d-none'>
            <div className='alert alert-success'>
                <h1>Success!</h1>
                <p>An email to reset your password has been sent to your email. You can click the link contained in the email to reset your password.</p>
            </div>
        </section>

        <section id="reset_email_send_error" className='d-none'>
            <div className='alert alert-danger'>
                <h1>Error:</h1>
                <p>The email you have provided is invalid, or there is no user registered on the platform with such email. Try again.</p>
            </div>
        </section>
    </div>
  )
}

export default ResetPasswordForm
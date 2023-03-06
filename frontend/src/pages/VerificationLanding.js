import React, { useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function VerificationLanding() {
    const [success,setSuccess] = useState(false)
    const [timer,setTimer] = useState(10)

    const navigate = useNavigate()
    //get verif id from params using useParams hook
    const {verification_id} = useParams()

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(timer <= 0 ){
                return setTimer(0)
            }
            else{
                return setTimer(prev=>prev-1)
            }
        },1000)

        if(timer === 0){
            navigate("/login")
        }
        return ()=>{
            clearInterval(interval)
        }
    },[timer])

    useEffect(()=>{
        axios.get(`/users/verify/${verification_id}`)
        .then((response)=>{
            setSuccess(true)
        })
        .catch((error)=>{
            setSuccess(false)
        })
    },[])
    return (
        <div className='p-3'>
            {
                success ? (
                    <section id="verify_success" >
                        <div className='alert alert-success'>
                            <h1>Success</h1>
                            <p>Your account has successfully been verified. You may now log in using the email/username and password you specified during registration. </p>
                        </div>
                    </section>
                ) : (
                    <section id="verify_error"> 
                        <div className='alert alert-danger'>
                            <h1>Error</h1>
                            <p>There was an unexpected error during the verification process. You can request another verification email by logging in on the "Login" page. </p>
                        </div>
                    </section>
                )
            }

            <section>
                <h5>Redirecting to the Login page in {timer}s...</h5>
            </section>
        </div>
    )
}

export default VerificationLanding
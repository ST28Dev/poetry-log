import React from 'react'
import {Link,useNavigate} from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux'
import {logout,reset} from "../features/auth/authSlice"
import { poemReset } from '../features/poem/poemSlice'

import { AiFillHome } from "react-icons/ai";
import { IconContext } from 'react-icons/lib';
import {BsGlobe2} from "react-icons/bs"

// AiOutlineHome
function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.auth)

    const logoutUser = ()=>{
        dispatch(logout())
        dispatch(reset())
        dispatch(poemReset())
        navigate("/login")
    }
  return (
    <>
        <header className='d-flex bg-dark justify-content-between p-3'>
            <div className='align-self-center'>
                <Link to={user?"/home" : "/"} className='text-decoration-none'>
                    <div className='d-flex '>
                        <div>
                            <IconContext.Provider value={{style: {fontSize: '2rem', color: "white"}, className: ["mx-2, me-3"]}}>
                                <AiFillHome/>
                            </IconContext.Provider>
                        </div>
                    </div>
                </Link>
            </div>
            <div className='align-self-center flex-grow-1'>
                <Link to="/explore" className='text-decoration-none'>
                    <div className='d-flex '>
                        <div>
                            <IconContext.Provider value={{style: {fontSize: '2rem', color: "white"}, className: "align-self-center"}}>
                                <BsGlobe2/>
                            </IconContext.Provider>
                        </div>
                    </div>
                </Link>
            </div>
        <div>
                {user ? (
                        <div>
                            <button className="btn text-light btn-small" onClick={logoutUser}><span className='h4 fw-normal'>Logout</span></button>
                        </div>
                    ) : (
                    <div className='d-flex pt-1'>
                        <div className=' align-self-center'>
                            <Link to="/login" className='text-light text-decoration-none'>
                                <h4 className='m-0 fw-normal'>Login</h4>
                            </Link>
                        </div>
                        <div className='mx-2'>
                            <h4 className='m-0 fw-normal text-light'>|</h4>
                        </div>
                        <div className='me-3 align-self-center'> 
                            <Link to="/register" className='text-light text-decoration-none'>
                                <h4 className='m-0 fw-normal'>Register</h4>
                            </Link>
                        </div>
                    </div>
                )}
                
            </div>
        </header>
    </>
  )
}

export default Header
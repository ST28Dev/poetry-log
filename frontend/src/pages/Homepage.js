import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { poemReset } from '../features/poem/poemSlice'

import PoemForm from '../components/PoemForm'
import PoemList from "../components/PoemList"

function Homepage() {
  const navigate = useNavigate()
  

  const {user} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!user || (user && !user.verified)){
      navigate("/login")
    }
  },[])

  const togglePostPoem = () =>{
    const otherElems = [...document.querySelectorAll("div.operation_container")]

    otherElems.map((item) => item.setAttribute("hidden",true))

    const elem = document.querySelector("#post_poem_container")

    elem.removeAttribute("hidden")
  }

  const toggleViewPoems = () =>{
    const otherElems = [...document.querySelectorAll("div.operation_container")]

    otherElems.map((item) => item.setAttribute("hidden",true))

    const elem = document.querySelector("#poem_list_container")

    elem.removeAttribute("hidden")
  }

  return (
    <div>
      <div className='text-center my-4'>
        <h1 className='display-4 font_mukta'>Hello {user ? user.username : ""}!</h1>
      </div>

      <div id="profile_picture_container" className='d-flex justify-content-center rounded mb-4'>
        <img src="./user_card.png" alt="" id="profile_picture"></img>
      </div>

      <div className='p-3'>
        <h2 className='text-center font_mukta'>What would you like to do today?</h2>
        <div className='d-flex justify-content-center flex-column flex-md-row'>
          <button className='btn btn-primary font_mukta p-2 m-2 ms-0' onClick={togglePostPoem}>Post a Poem</button>
          <button className='btn btn-primary font_mukta p-2 m-2 ms-0' onClick={toggleViewPoems}>View my Poems</button>
          <button className='btn btn-primary font_mukta p-2 m-2 ms-0' onClick={()=>{
            dispatch(poemReset())
            navigate("/explore")}}>Browse Public Poems</button>
          <button className='btn btn-primary font_mukta p-2 m-2 ms-0' onClick={()=>{
            dispatch(poemReset())
            navigate("/")
          }}>Consult the About Page</button>
        </div>
      </div>

      <div id="result_container" className='mt-2 mb-4 bg-dark rounded'>
        <PoemForm/>
        <PoemList />
      </div>

    </div>
  )
}

export default Homepage
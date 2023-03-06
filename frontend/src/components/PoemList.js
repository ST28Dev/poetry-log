import React, { useState } from 'react'
import {useSelector, useDispatch} from "react-redux"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPoems, poemReset, deletePoem, toggleVisibility} from '../features/poem/poemSlice'
import { BsFillEyeFill, BsFillEyeSlashFill, BsSearch} from "react-icons/bs";
import { IconContext } from 'react-icons/lib'

function PoemList() {
  const {poems,isError,message,isLoading,isSuccess} = useSelector((state) => state.poem)
  const {user} = useSelector((state)=>state.auth)
  const [search,setSearch] = useState({
    queryString: "",
    queryType: "title"
  })
  const [currPoems,setCurrPoems] = useState(poems)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //update poems based on search query
  useEffect(()=>{
    setCurrPoems(poems)
  },[poems])

  useEffect(()=>{
    if(search.queryType==='title'){
      if(search.queryString){
        const regex = new RegExp(search.queryString)
        setCurrPoems(poems.filter((elem)=>{
          const test = regex.test(elem)
          return regex.test(elem.title)
        }))
      }
      else{
        setCurrPoems(poems)
      }
    }
    else{
      if(search.queryString){
        const regex = new RegExp(search.queryString)
        setCurrPoems(poems.filter((elem)=>{
          const test = regex.test(elem)
          console.log({regex,elem,test})
          return regex.test(elem.text)
        }))
      }
      else{
        setCurrPoems(poems)
      }
    }
  },[search])

  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
  },[])

  useEffect(()=>{
    
    if(isError){
      return
    }

    dispatch(getPoems())
    // setCurrPoems(poems)

    return ()=>{
      dispatch(poemReset())
    }

  },[isError,message,dispatch,user,navigate])

  const updateSearchParams = (e)=>{
    e.preventDefault()

    setSearch((prev)=>{
      return ({
        ...prev,
        [e.target.name]: e.target.value,
      })
    })

    
  }

  return (
    <div className='p-4 operation_container' id="poem_list_container"hidden>
      {/* Search */}
      <section className='mb-3'>
        <div className='d-flex mb-3'>
          <IconContext.Provider value={{className: "text-light fs-5 me-2 align-self-center"}}>
            <BsSearch/>
          </IconContext.Provider>
          <h4 className='text-light m-0'>Search </h4>
        </div>
        <div className='d-flex justify-content-between flex-column flex-md-row'>
          <div className='mb-2 mb-sm-0'>
            <input className='poem_list_search_input  ps-2' name="queryString" onChange={updateSearchParams} placeholder="Search"></input>
          </div>

          <div>
            <select className='poem_list_search_input' onChange={updateSearchParams} name="queryType">
              <option value="title">Title</option>
              <option value="text">Text</option>
            </select>
          </div>
        </div>
      </section>
      
      <section id="poem_display_container">
        {currPoems.length > 0 ? (<div>
          {currPoems.map((poem)=> (<div className='mb-3 bg-light p-3 rounded'>
            <div className='d-flex justify-content-between mb-3'>
                <div>
                  <button className='btn btn-danger btn-small rounded-circle mb-2' onClick={() => {
                      dispatch(deletePoem(poem._id))
                      // setCurrPoems((prev)=>{
                      //   return prev.filter((elem)=>elem._id !== poem._id)
                      // })
                    }
                  }>
                    <h6 className='m-0 p-0'>X</h6>
                  </button>
                </div>

                <div className='d-flex'>
                  {
                    poem.visibility === "private" ? (
                      <div>
                          <button className='visibility-button btn btn-danger btn-small' onClick={(e)=>{
                        dispatch(toggleVisibility(poem._id))
        
                        if(poem.visibility === "public" && !isLoading){
                          e.target.classList.remove("btn-success")
                          e.target.classList.add("btn-danger")
        
                          return
                        }
                        
                        if(poem.visibility === "private" && !isLoading){
                          e.target.classList.remove("btn-danger")
                          e.target.classList.add("btn-success")
        
                          return
                        }
                        }}><span className='me-2 font_mukta'>{poem.visibility}</span>{
                          poem.visibility === "private" ? <BsFillEyeSlashFill/> : <BsFillEyeFill/>
                        }</button>
                      </div>
                    )

                    : (
                      <div>
                        <button className='visibility-button btn btn-small btn-success' onClick={(e)=>{
                      dispatch(toggleVisibility(poem._id))

                          if(poem.visibility === "public" && !isLoading){
                            e.target.classList.remove("btn-success")
                            e.target.classList.add("btn-danger")
          
                            return
                          }
                          
                          if(poem.visibility === "private" && !isLoading){
                            e.target.classList.remove("btn-danger")
                            e.target.classList.add("btn-success")
          
                            return
                          }
                        }}><span className='me-2 font_mukta'>{poem.visibility}</span>{
                          poem.visibility === "private" ? (<BsFillEyeSlashFill/>) :
                          <BsFillEyeFill/> 
                      }</button>
                      </div>
                    )
                  }
                </div>

            </div>
            
            <div>
              <h2 className='font_labrada'>{poem.title} by {user.username}</h2>
            </div>

            {
              poem.text.split("\n").map((line)=>{
                return <p className='h5 fw-light font_lato'>{line ? line : "\u00A0"}</p>
              })
            }
          </div>))}
        </div>) : <h1 className='text-light text-center'>No poems to show, create some!</h1>}
      </section>

    </div>
  )
}

export default PoemList
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState} from 'react'
import { createPoem } from '../features/poem/poemSlice'

function PoemForm() {
    const [formData,setFormData] = useState({
        title: "",
        text: ""
    })

    const {title,text} = formData
    const {user} = useSelector((state)=>state.auth)
    
    const dispatch = useDispatch()

    const updateFormData = (e)=>{
        setFormData((prev)=>({
          ...prev,
          [e.target.name] : e.target.value
        }))
    }
    
    const submit = (e)=>{
        e.preventDefault()
        const inputs = [...document.querySelectorAll(".poem-create-input")]
        inputs.map((elem)=>{
            elem.value = ""
        })

        dispatch(createPoem({
            author: user._id,
            title,
            text
        }))

        setFormData(()=>({
            title: "",
            text: ""
        }))

        document.querySelector("#poem_create_success_container").classList.remove("d-none")

        const timeout = setTimeout(()=>{
            document.querySelector("#poem_create_success_container").classList.add("d-none")

            return clearTimeout(timeout)
        },5000)
    }
    
    //auto resize textarea when input > the height
    const resize = (e)=>{
        e.target.style.height = "auto"
        e.target.style.height = e.target.scrollHeight + "px"
    }

    
    return (
        <div id="post_poem_container" className='p-4 operation_container' hidden>
            <h2 className='text-light font_labrada mb-3'>Post a Poem</h2>
            <form className='form-group' onSubmit={submit}>
                <label className='me-2 h4 fw-normal text-light font_mukta'>Title: </label>
                <input className='form-control poem-create-input font_lato' type="text" name="title" onChange={updateFormData}></input><br/>

                <label className='me-2 h4 fw-normal text-light font_mukta'>Text <span className='text-danger fw-bold'>(required)* </span>:</label><br/>
                <textarea className='form-control poem-create-input font_lato fs-5' name="text" onChange={updateFormData} onInput={resize} required></textarea><br/>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-light btn-lg font_mukta' type='submit'>Submit</button>
                </div>
            </form>

            <section id="poem_create_success_container" className='d-none mt-3'>
                <div className='alert alert-success'>
                    <h1 className=''>
                        Success!
                    </h1>
                    <p>
                        Your poem was successfully created. You can find it in the "View my Poems" tab.
                    </p>
                </div>
            </section>
        </div>
    )
}

export default PoemForm
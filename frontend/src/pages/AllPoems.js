import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PaginatedPoems from '../components/PaginatedPoems'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AllPoems() {
    const [poems,setPoems] = useState([])
    // const [subsection,setSubsection] = useState([])
    // const [index, setIndex] = useState(0)
    const {user} = useSelector((state)=>state.auth)

    useEffect(()=>{
        getPoems()
    },[])


    const getPoems = async()=>{
        const response = await axios.get("/poems/public")
        setPoems(response.data)
    }

    return (
        // id="public_poem_page"
        <div className="pb-3" id="public_poem_page">
            <PaginatedPoems data={poems}/>
        </div>
    )
}

export default AllPoems
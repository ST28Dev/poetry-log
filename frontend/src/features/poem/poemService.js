import axios from "axios";

const URL = "poems/add"

const createPoem = async (poemData,token) => {
    //argument for axios.post()
    //supply the token acquired from thunkAPI
    //to the controller in the backend for checks
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(URL, poemData, config)
    
    return response.data
}

const getPoems = async (token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(URL.replace("add",""),config)

    return response.data
}

const deletePoem = async (poemID, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(URL.replace("add",`delete/${poemID}`),config)

    return response.data
}

const toggleVisibility = async(poemID,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.patch(URL.replace("add","toggleVisibility"),{
        _id: poemID
    },config)

    return response.data
}
const getPublicPoems = async() =>{
    const response = await axios.get(URL.replace("add","public"))

    return response.data
}

const poemService = {
    createPoem,
    getPoems,
    deletePoem,
    toggleVisibility,
    getPublicPoems
}

export default poemService
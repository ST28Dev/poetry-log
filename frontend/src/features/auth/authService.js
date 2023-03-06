import axios from 'axios'

const API_URL = "users/register"

//Register user
const register = async (userData) =>{
    const response = await axios.post(API_URL, userData)

    //check that we have the user data
    //axios puts the data inside of an obj in the
    //response var

    //if the user exists (we have an appropriate response from backend)
    //and they are verified save them to local storage
    if(response.data && response.data.verified){
        //use JSON -> localStorage only accepts strings
        localStorage.setItem("user",JSON.stringify(response.data))
    }

    return response.data
}

//log user in
const login = async (userData) =>{
    const response = await axios.post(API_URL.replace("register","login"), userData)

    //data attribute => the response sent from backend
    if(response.data){
        localStorage.setItem("user",JSON.stringify(response.data))
    }

    return response.data
}

//logout existing logged in user
const logout = () =>{
    localStorage.removeItem("user")
}

const authService = {
    register,
    logout,
    login
}

export default authService
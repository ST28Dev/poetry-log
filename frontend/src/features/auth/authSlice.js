import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import authService from "./authService"

//get user data from localStorage
const user = JSON.parse(localStorage.getItem("user"))

//create initial state
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Register user
//OPTIONAL: use a service for HTTP req
export const register = createAsyncThunk('auth/register',async (user, thunkAPI)=>{
    try{
        return await authService.register(user)
    }
    catch(error){
        //when server pops off a message ->
        //can be in multiple places
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        //thunkAPI has method called rejectWithValue 
        //send error message as payload (if provided in param)
        return thunkAPI.rejectWithValue(message)
    }
})

//log user in
export const login = createAsyncThunk('auth/login',async (user,thunkAPI)=>{
    try{
        return await authService.login(user)
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//log user out
export const logout = createAsyncThunk ("auth/logout", async ()=>{
    await authService.logout()
}) 
export const authSlice = createSlice({
    name: "auth",
    initialState,
    //reducers = not async
    reducers:{
        reset: (state) =>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ""
        }
    },
    //handle async thunk functions
    extraReducers: (builder)=>{
        builder
            //when register function is at pending state
            .addCase(register.pending, (state)=>{
                state.isLoading = true
            })
            //need to add action as a param because we are getting data back
            .addCase(register.fulfilled, (state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                
                //action.payload is returned from the register function in the service
            })
            .addCase(register.rejected, (state,action)=>{
                state.isLoading = false
                state.isError = true

                //message from thunkAPI.rejectWithValue  
                state.message = action.payload

                state.user = null
            })
            .addCase(login.pending, (state)=>{
                state.isLoading = true
            })
            //need to add action as a param because we are getting data back
            .addCase(login.fulfilled, (state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                
                //action.payload is returned from the login function in the service
                state.user = action.payload
            })
            .addCase(login.rejected, (state,action)=>{
                state.isLoading = false
                state.isError = true

                //message from thunkAPI.rejectWithValue  
                state.message = action.payload

                state.user = null
            })
            .addCase(logout.fulfilled, (state)=>{
                state.user = null
            })
            
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer
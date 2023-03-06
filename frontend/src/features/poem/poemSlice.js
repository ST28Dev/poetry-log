import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import poemService from "./poemService"

const initialState = {
    poems: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//create a poem
export const createPoem = createAsyncThunk("poems/create", async(poemData,thunkAPI) =>{
    try{
        //retrieve the token from the auth state in store, using thunkAPI's getState() method => retrieves all of the states in store
        const token = thunkAPI.getState().auth.user.token
        
        //pass token for authentication/authorization checks in poemService
        return await poemService.createPoem(poemData, token)
    }
    catch(error){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//get curr user's poems
export const getPoems = createAsyncThunk("poems/get",async(_,thunkAPI) =>{
    try{
        //retrieve user data
        const token = thunkAPI.getState().auth.user.token

        //find poems based on user data 
        return await poemService.getPoems(token)
    }  
    catch(error){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//delete a poem
export const deletePoem = createAsyncThunk("poems/delete", async(poemID,thunkAPI) =>{
    try{
        //retrieve the token from the auth state in store, using thunkAPI's getState() method => retrieves all of the states in store
        const token = thunkAPI.getState().auth.user.token

        //pass token for authentication/authorization checks in poemService
        return await poemService.deletePoem(poemID, token)
    }
    catch(error){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//update poem
export const toggleVisibility = createAsyncThunk("poems/update",async(poemID, thunkAPI) =>{
    try{
        const token = thunkAPI.getState().auth.user.token

        return await poemService.toggleVisibility(poemID,token)
    }
    catch(error){
        const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()

        return thunkAPI.rejectWithValue(message)
    }   
})

//get public poems
export const getPublicPoems = createAsyncThunk("/poems/getPublic",async(_,thunkAPI)=>{
    try{
        return await poemService.getPublicPoems()
    }
    catch(error){
        const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()

        return thunkAPI.rejectWithValue(message)
    }  
})

export const poemSlice = createSlice({
    name: 'poem',
    initialState,
    reducers: {
        poemReset: (state) => {
            state.isError = initialState.isError
            state.isSuccess = initialState.isSuccess
            state.isLoading = initialState.isLoading
            state.message = initialState.message
        }
    },
    extraReducers: (builder) =>{
        builder
            .addCase(createPoem.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(createPoem.rejected, (state,action)=>{
                state.isLoading = false
                state.isError = true
                state.isSuccess = false;
                state.message = action.payload
            })
            .addCase(createPoem.fulfilled,( state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.poems.push(action.payload)
            })
            .addCase(getPoems.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(getPoems.fulfilled, (state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.poems = action.payload
            })
            .addCase(getPoems.rejected, (state,action) =>{
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deletePoem.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(deletePoem.fulfilled, (state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.poems = state.poems.filter((item)=> item._id !== action.payload._id)
            })
            .addCase(deletePoem.rejected, (state,action) =>{
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(toggleVisibility.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(toggleVisibility.fulfilled, (state,action)=>{
                state.isSuccess = true
                state.isLoading = false
                state.poems = state.poems.map((item) => {
                    if(item._id === action.payload._id){
                        item.visibility = action.payload.visibility
                        return item
                    }
                    return item
                })
            })
            .addCase(toggleVisibility.rejected, (state,action) =>{
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(getPublicPoems.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(getPublicPoems.fulfilled, (state,action)=>{
                state.isSuccess = true
                state.isLoading = false
                state.poems = action.payload
            })
            .addCase(getPublicPoems.rejected, (state,action) =>{
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
    }
})

export const {poemReset} = poemSlice.actions
export default poemSlice.reducer
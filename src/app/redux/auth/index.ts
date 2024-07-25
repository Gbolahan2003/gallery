import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { user, userAccessToken, userData } from "./interface";


interface authstate{
    userAccesssToken:userAccessToken|null,
    UserData:userData|null
}

const initialState:authstate={
    userAccesssToken:null,
    UserData:null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUserAccessToken:(state:authstate, action:PayloadAction<userAccessToken>)=>{
            state.userAccesssToken = action.payload
        },
        setuser:(state:authstate, action:PayloadAction<userData>)=>{
            state.UserData = action.payload
        }
    }

})

export default authSlice

export const {setUserAccessToken, setuser}= authSlice.actions
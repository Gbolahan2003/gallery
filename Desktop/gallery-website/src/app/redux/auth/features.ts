import { db, auth } from "@/app/firebase/config";
import handleErrors from "@/errorHandler";
import { user } from "@/types/interfaces";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Dispatch } from "redux";
import { toast } from "sonner";
import { loginprops, userData } from "./interface";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { setuser } from ".";




export const signIn = (data:user)=>async(dispatch:Dispatch)=>{
    try {
        const response = await createUserWithEmailAndPassword(auth, data.email, data.password)
        const user = response.user
        const userRef = await doc(db, 'users', user.uid)
        await setDoc(userRef, {
            email:data.email,
            firstName:data.firstName,
            lastName:data.lastName
        })
        return true
    } catch (error) {
        handleErrors(error)
        return false
    }
}

export const login = (data:loginprops)=>async(dispatch:Dispatch)=>{
    try {
        const response = await signInWithEmailAndPassword(auth, data.email, data.password)
        return true
    } catch (error) {
        handleErrors(error)
        return false
    }
}

export const getUser = (uid:string)=> async(dispatch:Dispatch)=>{
    try {
        const UserSnap = await getDoc(doc(db, `users/${uid}`))
        if(UserSnap.exists()){
            const userData:userData|any =UserSnap.data()
            await dispatch(setuser(userData))
        }


    } catch (error) {
        handleErrors(error)
        return false
    }
}

export const logOut =()=>{
    return signOut(auth)
}

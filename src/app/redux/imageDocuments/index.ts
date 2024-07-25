import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ImageMetadata, singleImageData } from "./interface";


interface documentProps {
test:string|null,
imageMetaData:ImageMetadata[]|null,
singleImageData:singleImageData|null
}

const initialState:documentProps ={
 test:null,
 imageMetaData:null,
 singleImageData:null
}

const ImageDocumentSlice = createSlice({
    name:'imageDocument',
    initialState,
    reducers:{
        setImageData:(state:documentProps, action:PayloadAction<ImageMetadata[]>)=>{
            state.imageMetaData = action.payload
        },
        setSingleImagedata:(state:documentProps, action:PayloadAction<singleImageData|null>)=>{
            state.singleImageData = action.payload
        }
        
    }
})

export default ImageDocumentSlice
export const {setImageData, setSingleImagedata}= ImageDocumentSlice.actions
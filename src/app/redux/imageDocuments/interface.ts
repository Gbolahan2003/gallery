export interface UploadImageProps {
    image: File|any;
    name: string;
    description: string;
    width:number;
    height:number;
  }
  

  export interface ImageMetadata {
    id:string;
    name: string;
    description: string;
    imageUrl: string;
    uploadedAt: Date;
    width:number;
    height:number
  }
  export interface singleImageData{
    id:string;
    name: string;
    description: string;
    imageUrl: string;
    uploadedAt: Date;
    width:number;
    height:number
  }
  export interface imageData {
    imageMetadata:ImageMetadata[]
  }

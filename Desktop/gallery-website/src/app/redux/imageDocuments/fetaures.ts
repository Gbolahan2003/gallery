import { db, firestore, imageDB } from "@/app/firebase/config";
// import { UserData } from "@/app/userlist/page";
import { useAuth } from "@/context/authContext";
import handleErrors from "@/errorHandler";
import { log } from "console";
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";
// import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Dispatch } from "redux";
import { ImageMetadata, UploadImageProps, singleImageData } from "./interface";
import { setImageData, setSingleImagedata } from ".";




export const addUserData = async (data: { name: string; age: number, comment:string }, uid: string) => {
    try {
      // Create a reference to the user's friends sub-collection
      const uniqueID = new Date().getTime().toString();
      const addFreinds = collection(firestore, `users/${uid}/friends`)
      const docRef = doc(db, `users/${uid}/friends`, uniqueID); // Using the name as the document ID for simplicity
      await setDoc(docRef, data, { merge: true });
      console.log('Document written with ID: ', docRef.id);
      toast.success('User data sent');
    } catch (e) {
      console.error('Error adding document: ', e);
      toast.error('Failed to send user data');
    }
  };


  

  export const uploadImage = ({ image, name, description, width, height}: UploadImageProps, uid: string) => async (dispatch: Dispatch) => {
    try {
        const uniqueID = new Date().getTime().toString();
    
      const imageRef = ref(imageDB, `users/${uid}/uploads/${uniqueID}`);
      
      // Upload the image
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
  
      // Save metadata in Firestore
      const metadata = {
        id:uniqueID,
        name,
        description,
        imageUrl,
        width,
        height,
        uploadedAt: new Date(),
      };
  
      const docRef = doc(db, `users/${uid}/uploads/${uniqueID}`);
      await setDoc(docRef, metadata);
      console.log('sucess image', docRef.id);
      
      // Dispatch success action if you have any

      return true
  
    } catch (error) {
      console.error('Error uploading image: ', error);
      handleErrors(error)
      // Dispatch failure action if you have any
      return false
    }
  };

  export const fetchImageMetadata =  (uid: string) => async(dispatch:Dispatch)=>{
try {
    const imagesCollection = collection(db, `users/${uid}/uploads`);
    const q = query(imagesCollection);
    const querySnapshot = await getDocs(q);
  
    const imageMetadataList: ImageMetadata[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      imageMetadataList.push({
        id:data.id,
        width:data.width,
        height:data.height,
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        uploadedAt: data.uploadedAt.toDate(),
      });
    });
    dispatch(setImageData(imageMetadataList))
} catch (error) {
    handleErrors(error)
}
  };


  export const deleteImageData = (uid: string, docID: string | null) => async (dispatch: Dispatch) => {
    try {

  
      if (docID) {
        await deleteDoc(doc(db, `users/${uid}/uploads`, docID));
        toast.success('Image deleted successfully');
        return true;
      }
  
      return false; // Return false if docID is null
    } catch (error) {
      handleErrors(error);
      return false;
    }
  };

  export const getImageByID = (uid:string, docID:string|null)=>async(dispatch:Dispatch)=>{
    try {
      if(docID){
        const imageRef = await doc(db, `users/${uid}/uploads/${docID}`);
        const imageSnap = await getDoc(imageRef)
        if(imageSnap.exists()){
          const imagedata:singleImageData|any = imageSnap.data()
        await  dispatch(setSingleImagedata(imagedata))
          
        }

      }
      
    } catch (error) {
      handleErrors(error)
      return false
    }
  }
  export const EditImage = ({ name, description, width, height, image }: UploadImageProps, uid: string, docID: string | null) => async (dispatch: Dispatch) => {
    try {
      if (docID) {
        
        const imageRef = ref(imageDB, `users/${uid}/uploads/${docID}`);
        
        // Upload image to Firebase Storage
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
  
        // Save metadata in Firestore
        const metadata = {
          name,
          description,
          imageUrl,
          width,
          height,
          uploadedAt: new Date(),
        };
        const docRef = doc(db, `users/${uid}/uploads/${docID}`);
        await updateDoc(docRef, metadata);
  
        // Dispatch any necessary Redux actions here if needed
        // dispatch({ type: 'UPDATE_IMAGE_METADATA', payload: metadata });
  
        return true;
      }
    } catch (error) {
      handleErrors(error);
      return false;
    }
  };


  
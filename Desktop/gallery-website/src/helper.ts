import { ImageMetadata } from "./app/redux/imageDocuments/interface";

export function reverseArray<T>(array: T[] | null | undefined): T[] {
    if (!array) {
      return [];
    }
    return [...array].slice().reverse();
  }
  
  export  const filterByName = (array: ImageMetadata[], name: string) => {
    return array.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
}
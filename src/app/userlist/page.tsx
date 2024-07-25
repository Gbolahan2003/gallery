// 'use client'
// import React, { useEffect, useState } from 'react';
// import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
// import { db } from '@/app/firebase/config'; // Adjust the path as needed
// import { useAuth } from '@/context/authContext'; // Adjust the path as needed
// import { useRouter } from 'next/navigation';
// // import { fetchUserData } from '../redux/imageDocuments/fetaures';
// // import { fetchData } from 'next-auth/client/_utils';
// import { fetchDatas } from '../redux/imageDocuments/fetaures';
// import Image from 'next/image';

// export interface UserData {
//     name: string;
//     id: string;
//     comment: string;
//     age:number
// }

// const DashboardPage: React.FC = () => {
//     const { currentUser } = useAuth();
//     const [userData, setUserData] = useState<any>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isDarkMode, setIsDarkMode] = useState(true);
//     const router = useRouter();


//     useEffect(() => {
//         const getUserData = async () => {
//           try {
//             const users = await fetchDatas(currentUser.uid);
//             setUserData(users);
//           } catch (error) {
//             console.error("Error fetching users:", error);
//           } finally {
//             setIsLoading(false);
//           }
//         };
    
//         getUserData();
//       }, []);
    
 
//     if (isLoading) {
//         return <p>Loading...</p>;
//     }
//     console.log(userData);
    

//     return (
//     //     <div className="dashboard-page">
//     //     <h2>User Data</h2>
//     //     {userData.length > 0 ? (
//     //       userData.map((user: UserData, index: number) => (
//     //         <div key={index}>
//     //           <p><strong>Name:</strong> {user.name}</p>
//     //           <p><strong>age:</strong> {user.age}</p>
//     //           <p><strong>comment:</strong> {user.comment}</p>
//     //         </div>
//     //       ))
//     //     ) : (
//     //       <p>No user data available</p>
//     //     )}
//     //   </div>
//     <div className={`${isDarkMode ? 'bg-background' : 'bg-white'} min-h-screen text-primary-text`}>
//     <header className="p-4 border-b border-border-color">
//       <h1 className="text-4xl font-bold">Gallery App</h1>
//       <p className="text-secondary-text">Welcome to your gallery.</p>
//       <button
//         className="mt-4 p-2 bg-primary-accent text-primary-text rounded"
//         onClick={() => setIsDarkMode(!isDarkMode)}
//       >
//         Toggle Dark Mode
//       </button>
//     </header>
//     <main className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {[...Array(6)].map((_, index) => (
//         <div key={index} className="bg-card-bg p-4 rounded-lg shadow-md">
//           <Image width={200} height={100}  src={`https://via.placeholder.com/150?text=Image+${index + 1}`} alt={`Image ${index + 1}`} className="w-full h-auto rounded-lg" />
//           <h2 className="text-xl font-semibold mt-2">Image {index + 1}</h2>
//           <p className="text-secondary-text">Description of image {index + 1}.</p>
//         </div>
//       ))}
//     </main>
//   </div>
//     );
// };

// export default DashboardPage;


import React from 'react'

const UserList = () => {
  return (
    <div>UserList</div>
  )
}

export default UserList
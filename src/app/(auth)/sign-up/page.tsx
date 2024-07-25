'use client'
import React, { useState } from 'react'
import image from '@/assets/images/sign-up-image.svg'
import Image from 'next/image'
import { Form, Formik } from 'formik'
import CustomInput from '@/components/form/formik/customInput'
import { Button } from '@/components/element/button'
import { auth, db } from '@/app/firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import * as Yup from 'yup'
import { user } from '@/types/interfaces'
import { doc, setDoc } from 'firebase/firestore'
import { toast } from 'sonner'
import handleErrors from '@/errorHandler'
import { useAuth } from '@/context/authContext'
import Link from 'next/link'
import { AnyARecord } from 'dns'
import { useRouter } from 'next/navigation'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be more than 6 characters'),
  })

  const router = useRouter()

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
  const {currentUser, signUp} = useAuth()

  const handleSubmit = async (values:any) => {
    setIsLoading(true);
    // const { firstName, lastName, email, password } = values;

    console.log('Password:', values.password); // Log the password to debug

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        firstName:values.firstName,
        lastName:values.lastName,
        email:values.email,
        createdAt: new Date(),
      }, {merge:true});

      
      toast.success('Registration successful');
      router.push('/dashboard')
    } catch (error) {
      console.error('Error:', error);
      toast.error('Registration failed');
    } finally {
      setIsLoading(false);
   
    }
  };
  
  const imageUrl = 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';


  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-900">
    <div className="bg-gray-800 flex flex-col p-8 lg:p-20 lg:w-1/2 justify-center items-center w-full lg:h-screen">
     
      <div className="relative w-full h-64 lg:h-screen">
        <Image
          src={imageUrl}
          alt="image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    </div>
    <div className="flex flex-col p-8 lg:p-20 justify-center lg:w-1/2 w-full">
      <h1 className="text-3xl text-white lg:text-4xl font-semibold mb-4">Welcome back</h1>
      <h2 className="text-xl text-white lg:text-2xl mb-8">Enter details to login</h2>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form className="space-y-6">
       <div className="flex  lg:gap-2 md:gap-1 gap-6 md:flex-row lg:flex-row flex-col">   
       <div className="lg:w-1/2 md:1/2"><CustomInput name="firstName" label="" placeholder="first name" /></div>
          <div className="lg:w-1/2 md:1/2"><CustomInput name="lastName" label="" placeholder="Last name" /></div></div>
          <CustomInput name="email" label="" placeholder="Email" />
          <CustomInput
            name="password"
            type={showPassword ? 'text' : 'password'}
            label=""
            placeholder="Password"
            handleShowPassword={() => setShowPassword(!showPassword)}
          />
          <Button size="full" type="submit" isLoading={isLoading}>
            Submit
          </Button>
          <div className="mt-4 flex gap-2 justify-center">
            <p className="text-blue-400 text-white">{`already have an account?`}</p>
            <Link href="/login" className="  hover:underline text-blue">
              Login
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  </div>

  )
}

export default SignUp

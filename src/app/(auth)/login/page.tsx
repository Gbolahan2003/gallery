'use client'
import React, { useState } from 'react'
import image from '@/assets/images/background.jpg'
import Image from 'next/image'
import { Form, Formik } from 'formik'
import CustomInput from '@/components/form/formik/customInput'
import { Button } from '@/components/element/button'
import * as Yup from 'yup'
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'
import { user } from '@/types/interfaces'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import handleErrors from '@/errorHandler'
import { loginprops } from '@/app/redux/auth/interface'
import { useAuth } from '@/context/authContext'





const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)

  const router = useRouter()
  
  const validationSchema = Yup.object({
    email:Yup.string().email('Invalid email address').required('Email is required'),
    password:Yup.string().required('password is required')
  })
  const initialValues={
    email:'',
    password:''
  }
 
  const {signIn} = useAuth()
  const handleSubmit = async (values: loginprops) => {
    setIsLoading(true)
    try {
      await signIn(values.email, values.password)
      toast.success('Login sucsessful')
      router.push('/dashboard')
      return
    } catch (error) {
      handleErrors(error)
    }
    setIsLoading(false)
  }

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
            <p className="text-blue-400 text-white">{`Don't have an account?`}</p>
            <Link href="/sign-up" className="  hover:underline text-blue">
              Sign up
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  </div>

  )
}

export default Login
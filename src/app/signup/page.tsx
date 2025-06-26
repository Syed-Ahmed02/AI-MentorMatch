import React from 'react'
import { SignupForm } from '../../components/Auth/login'
import Link from 'next/link'

const page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <SignupForm />
      <div className="mt-4 text-center">
        <span className="text-gray-600">Already have an account? </span>
        <Link href="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign in</Link>
      </div>
    </div>
  )
}

export default page 
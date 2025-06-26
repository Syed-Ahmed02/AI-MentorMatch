import React from 'react'
import { LoginForm } from '../../components/Auth/login'
import Link from 'next/link'

const page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <LoginForm />
      <div className="mt-4 text-center">
        <span className="text-gray-600">Don't have an account? </span>
        <Link href="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</Link>
      </div>
    </div>
  )
}

export default page
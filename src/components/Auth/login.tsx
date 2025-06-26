'use client'
import * as React from 'react';
import * as Label from '@radix-ui/react-label';
import { useState, FormEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

function AuthInput({ id, label, type, value, onChange }: { id: string, label: string, type: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <Label.Root htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</Label.Root>
      <input
        id={id}
        name={id}
        type={type}
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function AuthButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 ' +
        (props.className || '')
      }
    >
      {children}
    </button>
  );
}

function ErrorDisplay({ error }: { error: string }) {
  if (!error) return null;
  return (
    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-2">
      {error}
    </div>
  );
}

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signInWithGoogle } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      router.push('/dashboard');
    } catch (error) {
      setError('Failed to log in');
      console.error(error);
    }
    setLoading(false);
  }

  async function handleGoogleSignIn() {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      router.push('/dashboard');
    } catch (error) {
      setError('Failed to sign in with Google');
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <ErrorDisplay error={error} />
        <div className="space-y-4">
          <AuthInput id="email" label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <AuthInput id="password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="space-y-4">
          <AuthButton type="submit" disabled={loading}>{loading ? 'Loading...' : 'Sign In'}</AuthButton>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  );
}

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, signInWithGoogle } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }
    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      router.push('/upload-resume');
    } catch (error) {
      setError('Failed to create account');
      console.error(error);
    }
    setLoading(false);
  }

  async function handleGoogleSignIn() {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      router.push('/upload-resume');
    } catch (error) {
      setError('Failed to sign in with Google');
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <ErrorDisplay error={error} />
        <div className="space-y-4">
          <AuthInput id="email" label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <AuthInput id="password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="space-y-4">
          <AuthButton type="submit" disabled={loading}>{loading ? 'Loading...' : 'Sign Up'}</AuthButton>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Sign up with Google
          </button>
        </div>
      </form>
    </div>
  );
}   
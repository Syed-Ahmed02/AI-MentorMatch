'use client'
import { NextPage } from 'next';
import { useAuth } from '@/contexts/AuthContext';
import Login from '@/components/Auth/login';
import ChatComponent from '@/components/Chat/ChatComponent';

const Home: NextPage = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      {currentUser ? <ChatComponent /> : <Login />}
    </div>
  );
};

export default Home;
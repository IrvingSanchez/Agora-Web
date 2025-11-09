/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Login from '@/modules/auth/components/Login';

const LoginView: React.FC = () => {
  return (
    <>
      
      <h3 className="mb-10 font-extralight text-center text-gray-600">Bienvenido</h3>
      <main className="bg-white rounded-md  shadow-xl">
        <Login />
      </main>
    </>
  );
};



export default LoginView;
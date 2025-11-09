/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// import { Link } from 'react-router-dom';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import Input from "@/components/inputs/Input";
import { Loader }  from '@/components/shared/Loader';
// import { Icon } from '@iconify/react';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Requerido'),
  password: Yup.string().required('Requerido'),
});


const Login: React.FC = () => {

  const { login, isLoggingIn } = useAuth();

  return (
    <>
      {isLoggingIn && <Loader background={true} size="small" />}

      <Formik
        initialValues={{ username: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={login}
      >
        {({ values }) => (
          <div>
            <Form className="p-[32px] mx-auto  flex flex-col items-center gap-4">
              {/* <img src="/src/assets/images/branding/logo-dashboard.png" alt="Auth Illustration" 
              className="w-[200px] object-cover object-center mb-10"
            /> */}
            <h2 className="font-extralight mb-10 text-center">Agora</h2>
              <div className="flex flex-col gap-4 w-full">
                <Input
                  label="Nombre de usuario"
                  name="username"
                  type="text"
                   active={!!values.username}
                />
              </div>

              <div className="flex flex-col gap-4 w-full">
                <Input
                  label="Contraseña"
                  name="password"
                  type="password"
                  active={!!values.password}
                  
                />
              </div>
              <div className="w-full pt-8">
                <button
                  type="submit"
                  className="btn-primary w-full max-w-[inherit]"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? 'Cargando...' : 'Iniciar Sesión'}
                  {/* <Icon icon="mdi:menu" width="20" height="20" /> */}
                </button>
              </div>


            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Login;
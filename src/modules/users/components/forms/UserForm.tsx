/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form, Formik } from 'formik';
import Input from '@/components/inputs/Input';
import { userValidationSchema } from '@/modules/users/schemas/userValidation';
import { Loader }  from '@/components/shared/Loader';

interface FormUserProps {
  initialData: any;
  isLoading: boolean;
  onSubmit: (values: any) => void;
}
const UserForm: React.FC<FormUserProps> = ({
  initialData,
  isLoading,
  onSubmit,
}: any) => {
  

  return (
    <>
    {isLoading && <Loader background={true} size="small" />}
     {!isLoading && 
    <Formik
      initialValues={initialData}
      enableReinitialize={true}
      validationSchema={userValidationSchema}
      onSubmit={onSubmit}
    >
      {({values}) => (
        <Form className="grid grid-cols-2 gap-4 p-4">
          
          
          {/* Información Personal */}
          
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <Input
              label="Nombre"
              name="name.first"
              type="text"
              active={`${!!values.name?.first}`}
            />
            <Input
              label="Apellidos"
              name="name.last"
              type="text"
              active={`${!!values.name?.last}`}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              active={`${!!values.email}`}
            />
            <Input
              label="Teléfono"
              name="phone"
              type="text"
              active={`${!!values.phone}`}
            />
            <Input
              label="Moneda"
              name="wallet.currency"
              type="text"
              active={`${!!values.wallet?.currency}`}
            />
            <Input
              label="Proveedor"
              name="wallet.provider"
              type="text"
              active={`${!!values.wallet?.provider}`}
            />
            <Input
              label="Balance"
              name="wallet.balance"
              type="text"
              active={`${values.wallet?.balance === 0 ? true : !!values.wallet?.balance}`}
            />
            <Input
              label="Billera Interledger"
              name="wallet.interledgerAddress"
              type="text"
              active={`${!!values.wallet?.interledgerAddress}`}
            />
            <Input
              label="Clave Pública"
              name="wallet.publicKey"
              type="text"
              active={`${!!values.wallet?.publicKey}`}
            />
          </div>
          
          
       
          {/* Botones */}
          <div className="col-span-2 flex justify-end gap-2 mt-4">
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
    }
    </>
  );
};

export default UserForm;
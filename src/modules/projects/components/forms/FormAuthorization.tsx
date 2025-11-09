/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form, Formik } from 'formik';
import Input from '@/components/inputs/Input';
import { AuthValidationSchema } from '@/modules/projects/schemas/authrization';
import { Loader }  from '@/components/shared/Loader';

interface FormAuthorizationProps {
  initialData: any;
  isLoading: boolean;
  onSubmit: (values: any) => void;
}
const FormAuthorization: React.FC<FormAuthorizationProps> = ({
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
      validationSchema={AuthValidationSchema}
      onSubmit={onSubmit}
    >
      {({values}) => (
        <Form className="flex flex-col gap-4 p-4">
          
          
          {/* Información Personal */}
          
          <div className="col-span-2 flex flex-col gap-4">

            <input type="hidden" name="ownerId" value={values.ownerId} />
            
            <Input
              label="Dirección de la billetera del receptor"
              name="receiverWalletAddress"
              type="text"
              active={`${!!values.receiverWalletAddress}`}
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

export default FormAuthorization;
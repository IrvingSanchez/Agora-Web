/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form, Formik } from 'formik';
import  {Select} from '@/components/inputs/Input';
import { userValidationSchema } from '@/modules/participant/schemas/userValidation';
import { Loader }  from '@/components/shared/Loader';

interface FormParticipantProps {
  initialData: any;
  isLoading: boolean;
  onSubmit: (values: any) => void;
  listUsers: any[];
}
const ParticipantForm: React.FC<FormParticipantProps> = ({
  initialData,
  isLoading,
  onSubmit,
  listUsers
}: any) => {
  
  const role = [
   { value: "sender", label: "Remitente" },
  { value: "receiver", label: "Receptor" },
  { value: "validator", label: "Validador" }
    
  ];
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
      {({values, setFieldValue}) => (
        <Form className="flex flex-col gap-4 p-4">
          
          
          {/* Información Personal */}
          
          <div className="flex flex-col gap-4">

            
            <Select
              label="Usuario vinculado"
              name="userId"
              options={listUsers}
              onSelect={(value: string) => setFieldValue('userId', value)}
              active={`${!!values.userId}`}
            />
            <Select
              label="Rol del participante"
              name="rol"
              options={role}
              onSelect={(value: string) => setFieldValue('role', value)}
              active={`${!!values.role}`}
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

export default ParticipantForm;
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form, Formik } from 'formik';
import Input from '@/components/inputs/Input';
import { userValidationSchema } from '@/modules/projects/schemas/userValidation';
import { Loader }  from '@/components/shared/Loader';

interface FormUserProps {
  initialData: any;
  isLoading: boolean;
  onSubmit: (values: any) => void;
}
const ProjectForm: React.FC<FormUserProps> = ({
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

            <input type="hidden" name="ownerId" value={values.ownerId} />
            
            <Input
              label="Título"
              name="title"
              type="text"
              active={`${!!values.title}`}
            />
            <Input
              label="Descripción"
              name="description"
              type="text"
              active={`${!!values.description}`}
            />
            <Input
              label="Presupuesto Total"
              name="budget.total"
              type="text"
              active={`${!!values.budget?.total}`}
            />
            <Input
              label="Moneda"
              name="budget.currency"
              type="text"
              active={`${!!values.budget?.currency}`}
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

export default ProjectForm;
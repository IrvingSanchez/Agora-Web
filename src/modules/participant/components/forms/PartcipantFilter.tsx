/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from 'react';
import { Icon } from "@iconify/react";
import { Form, Formik } from 'formik';
import Input from '@/components/inputs/Input';
import * as Yup from 'yup';
import { useDebounce } from '@/hooks/useDebounce';

const ParticipantFilter = ({ onFilterChange, initialValues, className = '', resetFilters, onDownload, canDownload }: any) => {
  const [searchTerm, setSearchTerm] = useState(initialValues.search || '');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms de debounce
  const formikRef = useRef<any>(null);

  const filterSchema = Yup.object().shape({});

 

  // Efecto para aplicar el filtro cuando el término de búsqueda cambia (después del debounce)
  useEffect(() => {
    if (formikRef.current ) {
      formikRef.current.submitForm();
    }
  }, [debouncedSearchTerm]);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={filterSchema}
      onSubmit={onFilterChange}
      enableReinitialize
    >
      {({ values }) => (
        <Form className={`flex flex-wrap items-start gap-4 ${className}`}>
          <div className="flex-1 min-w-[200px]">
            <Input
              label="Buscar por nombre"
              name="search"
              onChange={(e: any) => {
                values.search = e.target.value;
                 setSearchTerm(e.target.value);
              }}
              active={`${!!values.search}`}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              resetFilters();
            }}
            className="btn-secondary"
          >
            <Icon icon="mdi:refresh" width="20" height="20" className="mr-2" />
          </button>
          {canDownload && (
            <button
              type="button"
              onClick={onDownload}
              className="btn-primary flex items-center gap-2 whitespace-nowrap"
            >
              <Icon icon="mdi:download" width="20" height="20" />
              Descargar
            </button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ParticipantFilter;
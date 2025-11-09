/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal } from '@/components/modal/Modal';
import ProjectForm  from '@/modules/projects/components/forms/ProjectForm';
import FormAuthorization from '@/modules/projects/components/forms/FormAuthorization';


interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  isLoading?: boolean;
  onSubmitSuccess: (values: any) => void;
  typeForm?: string;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  initialData,
  isLoading,
  onSubmitSuccess,
  typeForm,
}) => {
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={initialData?.name ?  typeForm === "project" ? 'Editar Proyecto' : 'Por favor la cuenta de receptor' : typeForm === "project" ? 'Crear Nuevo Proyecto' : 'Indicanos la billetera del receptor'}
      preventBackdropClose={true}
      showCloseButton={true}
    >
    {
      typeForm === "project" ?
       <ProjectForm
        initialData={initialData}
        isLoading={!!isLoading}
        onSubmit={onSubmitSuccess}
      /> : 
      <FormAuthorization
        initialData={initialData}
        isLoading={!!isLoading}
        onSubmit={onSubmitSuccess}
      />
    }
    </Modal>
  );
};
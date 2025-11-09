/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal } from '@/components/modal/Modal';
import ProjectForm  from '@/modules/projects/components/forms/ProjectForm';


interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  isLoading?: boolean;
  onSubmitSuccess: (values: any) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  initialData,
  isLoading,
  onSubmitSuccess,
}) => {
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={initialData?.name ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
      preventBackdropClose={true}
      showCloseButton={true}
    >
      <ProjectForm
        initialData={initialData}
        isLoading={!!isLoading}
        onSubmit={onSubmitSuccess}
      />
    </Modal>
  );
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal } from '@/components/modal/Modal';
import UserForm  from '@/modules/users/components/forms/UserForm';


interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  isLoading?: boolean;
  onSubmitSuccess: (values: any) => void;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
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
      <UserForm
        initialData={initialData}
        isLoading={!!isLoading}
        onSubmit={onSubmitSuccess}
      />
    </Modal>
  );
};
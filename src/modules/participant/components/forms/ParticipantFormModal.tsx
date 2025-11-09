/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal } from '@/components/modal/Modal';
import ParticipantForm from './ParticipantForm';


interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  isLoading?: boolean;
  onSubmitSuccess: (values: any) => void;
  listUsers: any[];
}

export const ParticipantsModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  initialData,
  isLoading,
  onSubmitSuccess,
  listUsers
}) => {
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={initialData?.name ? 'Editar Participante' : 'Crear Nuevo Participante'}
      preventBackdropClose={true}
      showCloseButton={true}
    >
      <ParticipantForm
        initialData={initialData}
        isLoading={!!isLoading}
        onSubmit={onSubmitSuccess}
        listUsers={listUsers}
      />
    </Modal>
  );
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Modal } from '@/components/modal/Modal';
import FormMoney from './FormMoney';


interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  isLoading?: boolean;
  onSubmitSuccess: (values: any) => void;
}

export const SendMoneyModal: React.FC<SendMoneyModalProps> = ({
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
      title={initialData?.name ? 'Gracias por colaborar' : 'Realiza tu donación'}
      preventBackdropClose={true}
      showCloseButton={true}
    >
      <FormMoney
        initialData={initialData}
        isLoading={!!isLoading}
        onSubmit={onSubmitSuccess}
      />
    </Modal>
  );
};
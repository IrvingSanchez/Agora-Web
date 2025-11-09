import { Icon } from '@iconify/react'
import { Modal } from '@/components/shared/Modal'

interface LoadingModalProps {
  isOpen: boolean
  message?: string
}

export const LoadingModal = ({ isOpen, message = 'Procesando...' }: LoadingModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="">
      <div className="p-8 flex flex-col items-center">
        <div className="animate-spin">
          <Icon icon="mdi:loading" className="w-8 h-8 text-primary" />
        </div>
        <p className="mt-4 text-sm font-medium text-gray-900">
          {message}
        </p>
      </div>
    </Modal>
  )
}
import { Icon } from '@iconify/react'
import { Modal } from '@/components/shared/Modal'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  message: string
}

export const SuccessModal = ({ isOpen, onClose, message }: SuccessModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="p-8 flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <Icon icon="mdi:check" className="w-6 h-6 text-green-500" />
        </div>
        <p className="mt-4 text-sm font-medium text-gray-900">
          {message}
        </p>
      </div>
    </Modal>
  )
}
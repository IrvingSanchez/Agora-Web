import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  preventBackdropClose?: boolean;
  showCloseButton?: boolean;
  size?: '500' | '700' | '900' | '1200';
}

export const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title,
  description,
  preventBackdropClose = false,
  showCloseButton = true,
  size = '700'
}: ModalProps) => {
  const modalRoot = document.getElementById('modal-root');
  const modalElement = useRef(document.createElement('div'));

  useEffect(() => {
    const el = modalElement.current;
    modalRoot?.appendChild(el);
    return () => {
      modalRoot?.removeChild(el);
    };
  }, [modalRoot]);

  const handleBackdropClick = () => {
    if (!preventBackdropClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={handleBackdropClick}
        />
        
        {/* Modal Panel */}
        <div className={`relative w-full transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all my-8  p-6 md:p-12 ${size === '500' ? 'max-w-[500px]' : ''} ${size === '700' ? 'max-w-[700px]' : ''} ${size === '900' ? 'max-w-[900px]' : ''} ${size === '1200' ? 'max-w-[1200px]' : '700px' }`}>
          {/* Header with title and close button */}
          <div className="mb-4 flex items-center justify-between">
            {title && (
              <h5 className="font-medium leading-6 text-gray-900 py-6 mb-8">{title}</h5>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="rounded-full p-1 mt-[-12px] hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 ml-auto"
                aria-label="Cerrar modal"
              >
                <svg 
                  className="w-8 h-8 " 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            )}
          </div>
          {
            description && (
              <p className="text-gray-500 mb-4">{description}</p>
            )
          }
          
          {children}
        </div>
      </div>
    </div>,
    modalElement.current
  );
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react'
import { useAuthStore } from '@/modules/auth/store/authStore';
import { useNavigate } from "react-router-dom"; 
import { alertDefaultWithImage } from "@/hooks/useAlerts";
import type { ErrorResponse } from '@/interfaces';

type ErrorDetail = {
  detail: string;
  status: number;
}
export function useErrorHandler() {
  const { logout } : any = useAuthStore(); 
  const navigate = useNavigate();
  const [errors, setErrors] = useState<ErrorDetail | null>(null);

  const handleError = (err: ErrorResponse) => {
    if (err.status == 401 || err.status == 403) {
      alertDefaultWithImage('No autorizado', 'La sesión ha expirado', '/src/assets/images/alerts/clock.png', 15000)
      logout();
      navigate('/login');
      return null;
    } else if (err.status == 500) {
      alertDefaultWithImage('Error en el servidor', 'intente más tarde', '/src/assets/images/alerts/clock.png', 3000)
      return null;
    } else {
      // Crear el error directamente sin usar el estado
      const errorDetail = {
        detail: err.response?.data?.detail || 'Error desconocido',
        status: err.status
      };
      
      // Actualizar el estado para otros usos
      setErrors(errorDetail);
      // Retornar el error directamente
      return errorDetail;
    }
  }

  return {
    handleError,
    errors
  }
}



/* eslint-disable @typescript-eslint/no-explicit-any */
// src/modules/login/hooks/useAuth.js
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/modules/auth/store/authStore';
import { ApiService } from '@/core/services/ApiService';
import { showAlert } from '@/hooks/useAlerts';
import { useNavigate } from 'react-router-dom';
import { permissions, getMockAuth } from '../mock/mockAuth';
import type { ErrorResponse } from '@/interfaces';

interface LoginCredentials {
  username: string;
  password: string;
}

// Toggle entre mock y servicio real
const USE_MOCK_DATA = true; // Cambiar a false para usar el servicio real

const getLoginFromApi = async (credentials: LoginCredentials): Promise<any> => {
  const response = await ApiService.post('/auth/login', {
    ...credentials
  });
  return response.data;
}

const getLogin = USE_MOCK_DATA ? getMockAuth : getLoginFromApi;


export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser, logout: storeLogout, sesion }: any = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: getLogin,
    onSuccess: (data) => {
      console.log("🚀 ~ useAuth ~ data:", data)
      setUser({
        name: data.data.user.name,
        email: data.data.user.email,
        role:data.data.user.role,
        id: data.data.user.id,
        token: data.data.access_token,
        permissions: permissions
      });
      showAlert('success', data.data.message);
      navigate('/admin');
    },
    onError: (error: ErrorResponse) => {
      console.log("🚀 ~ useAuth ~ error:", error)
      showAlert('error', error.response.data.detail || 'Error de autenticación');
    }
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      new Promise((resolve) => setTimeout(resolve, 100));
    },
    onSuccess: () => {
      storeLogout();
      navigate('/login');
    },
    onError: (error: ErrorResponse) => {
      showAlert('error', error.response.data.detail || 'Error al cerrar sesión');
      storeLogout();
      navigate('/login');
    }
  });

  return {
    sesion,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    error: loginMutation.error || logoutMutation.error
  };
};
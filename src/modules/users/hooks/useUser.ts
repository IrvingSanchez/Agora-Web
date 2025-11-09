/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, } from 'react';
import {ApiService} from "@/core/services/ApiService";
import { showAlert } from '@/hooks/useAlerts'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userStore } from '@/modules/users/store/userStore';
import { JwtService } from '@/core/services/JwtService';

const getUser = async (id: any) => {
  const { data } = await ApiService.get(`/users/index/${id}`);
  return data;
};

const createUser = async ({ user, id }: any) => {
  const url = id ? `/users/update` : "users/register";
  const { data } = await ApiService.post(url, user);
  return data;
};

const deleteUser = async (id: any) => {
  const { data } = await ApiService.delete(`/users/delete/${id}`);
  return data;
};

export const useUser = () => {
  const queryClient: any = useQueryClient();
  const {
    user,
    idUser,
    setIdUser,
    bodyUser,
    setUser,
    clearUser,
    getDefaultUser
  } = userStore();

  // Query para obtener usuario
  const { isLoading, isError, error, data: usr } = useQuery({
    queryKey: ['user', idUser],
    queryFn: () => getUser(idUser),
    staleTime: 0,
    gcTime: 0,
    enabled: !!idUser
  });

   useEffect(() => {
    if (usr) {
      setUser(usr.data.attributes);
      userStore.setState({ idUser: null });
    }
  }, [usr, setUser]);

  useEffect(() => {
    if (error) {
       const err = error as { response?: { data?: { detail?: string } } };
      const detail = err.response?.data?.detail;
      if (detail) {
        showAlert('error', detail);
      }
    }
  }, [error]);

  // Mutaciones
  const userMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log("🚀 ~ useUser ~ data:", data)
      clearUser();
      showAlert('success', data.message);
      queryClient.invalidateQueries(['users']); // Invalida y refetch
    },
    onError: (error) => {
       const err = error as { response?: { data?: { detail?: string } } };
      const detail = err.response?.data?.detail;
      if (detail) {
        showAlert('error', detail);
      }
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      clearUser();
      showAlert('success', data.message);
      queryClient.invalidateQueries(['users']); // Invalida y refetch
    },
    onError: (error) => {
       const err = error as { response?: { data?: { detail?: string } } };
      const detail = err.response?.data?.detail;
      if (detail) {
        showAlert('error', detail);
      }
    }
  });


  return {
    user,
    idUser,
    bodyUser,
    clearUser,
    isLoading,
    isError,
    error,
    getDefaultUser,
    setUser,
    setIdUser,

    createUser: userMutation.mutate,
    deleteUser: deleteUserMutation.mutate,

    isUpdating: userMutation.isPending || deleteUserMutation.isPending,
    isUpdatingSuccess: userMutation.isSuccess || deleteUserMutation.isSuccess,
    isErrorUpdating: userMutation.isError || deleteUserMutation.isError,

    //permissions
    canCreateUsers: JwtService.hasPermissionTo('users', 'crear'),
    canEditUsers: JwtService.hasPermissionTo('users', 'editar'),
    canDeleteUsers: JwtService.hasPermissionTo('users', 'eliminar'),
    canDownloadUsers: JwtService.hasPermissionTo('users', 'descargar'),
  };
};
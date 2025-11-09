/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {ApiService} from "@/core/services/ApiService";
import { showAlert } from '@/hooks/useAlerts'
import { useUsersStore } from '@/modules/users/store/usersStore';
import { getMockUsers } from "@/modules/users/mock/mockUsers";

// Toggle entre mock y servicio real
const USE_MOCK_DATA = false; // Cambiar a false para usar el servicio real

// Función original que llama al servicio
const getUsersFromApi = async (filters: any): Promise<any> => {

  console.log("🚀 ~ getUsersFromApi ~ filters:", filters)

  const { data } = await ApiService.post(
    `/users`
  );
  return data;
};
// Función que selecciona entre mock y servicio real
const getUsers = USE_MOCK_DATA ? getMockUsers : getUsersFromApi;

export const useUsers = () => {
  const queryClient: any = useQueryClient();
  const {
    users,
    
   
    filters,
    filtesParams,
    
    setUsers,
    setFilter,
    resetFilters,
  } = useUsersStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users',filtesParams],
    queryFn: () => getUsers(filtesParams),
  });

  useEffect(() => {
    if (error) {
      console.log("🚀 ~ useUsers ~ error:", error)
      showAlert('error', 'Error al cargar los usuarios');
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      const { data: tasksData } = data;
     
     
      setUsers(tasksData);
    }
  }, [data, setUsers]);

  const refetchUsers = () => {
    queryClient.invalidateQueries(['users']);
  };

  return {
    users,
    isLoading,
    isError,
    error,
    filters,
    resetFilters,
    
    setfilter: setFilter,
    

    refetchUsers,
  };
};
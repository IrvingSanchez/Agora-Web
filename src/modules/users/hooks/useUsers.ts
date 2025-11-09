/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {ApiService} from "@/core/services/ApiService";
import { showAlert } from '@/hooks/useAlerts'
import { useUsersStore } from '@/modules/users/store/usersStore';
import { getMockUsers } from "@/modules/users/mock/mockUsers";

// Toggle entre mock y servicio real
const USE_MOCK_DATA = true; // Cambiar a false para usar el servicio real

// Función original que llama al servicio
const getUsersFromApi = async (pageSize: any, pageNumber: any, filters: any): Promise<any> => {
  const { data } = await ApiService.get(
    `/users?per_page=${pageSize}&page=${pageNumber}${filters}`
  );
  return data;
};
// Función que selecciona entre mock y servicio real
const getUsers = USE_MOCK_DATA ? getMockUsers : getUsersFromApi;

export const useUsers = () => {
  const queryClient: any = useQueryClient();
  const {
    users,
    currentPage,
    from,
    lastPage,
    perPage,
    to,
    total,
    filters,
    filtesParams,
    setCurrentPage,
    setFrom,
    setLastPage,
    setPerPage,
    setTo,
    setTotal,
    setUsers,
    setFilter,
    resetFilters,
  } = useUsersStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users', currentPage, perPage, filtesParams],
    queryFn: () => getUsers(perPage, currentPage, filtesParams),
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
      const { pagination } = tasksData.attributes;
      const { current_page, from, last_page, per_page, to, total } = pagination;

      setCurrentPage(current_page);
      setFrom(from);
      setLastPage(last_page);
      setPerPage(per_page);
      setTo(to);
      setTotal(total);
      setUsers(tasksData.attributes.data);
    }
  }, [data, setCurrentPage, setFrom, setLastPage, setPerPage, setTo, setTotal, setUsers]);

  const refetchUsers = () => {
    queryClient.invalidateQueries(['users']);
  };

  return {
    users,
    isLoading,
    isError,
    error,
    currentPage,
    from,
    lastPage,
    perPage,
    to,
    total,
    filters,
    resetFilters,
    
    setfilter: setFilter,
    getPage: setCurrentPage,
    setPerPage: setPerPage,

    refetchUsers,
  };
};
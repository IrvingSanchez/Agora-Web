/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {ApiService} from "@/core/services/ApiService";
import { showAlert } from '@/hooks/useAlerts'
import {  projectsStore } from '@/modules/projects/store/projectsStore';
import { getMockProjects } from "@/modules/projects/mock/mockProjects";

// Toggle entre mock y servicio real
const USE_MOCK_DATA = true; // Cambiar a false para usar el servicio real

// Función original que llama al servicio
const getProjectsFromApi = async (filters: any): Promise<any> => {

  console.log("🚀 ~ getUsersFromApi ~ filters:", filters)

  const { data } = await ApiService.post(
    `/users`
  );
  return data;
};
// Función que selecciona entre mock y servicio real
const getProjects = USE_MOCK_DATA ? getMockProjects : getProjectsFromApi;

export const useProjects = () => {
  const queryClient: any = useQueryClient();
  const {
    projects,
    
   
    filters,
    filtesParams,
    
    setProjects,
    setFilter,
    resetFilters,
  } = projectsStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['projects',filtesParams],
    queryFn: () => getProjects(filtesParams),
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
     
     
      setProjects(tasksData);
    }
  }, [data, setProjects]);

  const refetchProjects = () => {
    queryClient.invalidateQueries(['projects']);
  };

  return {
    projects,
    isLoading,
    isError,
    error,
    filters,
    resetFilters,
    
    setfilter: setFilter,
    

    refetchProjects,
  };
};
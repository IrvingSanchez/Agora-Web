/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {ApiService} from "@/core/services/ApiService";
import { showAlert } from '@/hooks/useAlerts'
import {  participantsStore } from '@/modules/participant/store/ParticipantsStore';
import { getMockParticipants } from "@/modules/participant/mock/mockParticipants";

// Toggle entre mock y servicio real
const USE_MOCK_DATA = true; // Cambiar a false para usar el servicio real

// Función original que llama al servicio
const getParticipantsFromApi = async (filters: any): Promise<any> => {

  console.log("🚀 ~ getUsersFromApi ~ filters:", filters)

  const { data } = await ApiService.post(
    `/users`
  );
  return data;
};
// Función que selecciona entre mock y servicio real
const getParticipants = USE_MOCK_DATA ? getMockParticipants : getParticipantsFromApi;

export const useParticipants = () => {
  const queryClient: any = useQueryClient();
  const {
    participants,
    
   
    filters,
    filtesParams,
    
    setParticipants,
    setFilter,
    resetFilters,
  } = participantsStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['participants',filtesParams],
    queryFn: () => getParticipants(filtesParams),
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
     
     
      setParticipants(tasksData);
    }
  }, [data, setParticipants]);

  const refetchParticipants = () => {
    queryClient.invalidateQueries(['participants']);
  };

  return {
    participants,
    isLoading,
    isError,
    error,
    filters,
    resetFilters,
    
    setfilter: setFilter,
    

    refetchParticipants,
  };
};
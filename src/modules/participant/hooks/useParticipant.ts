/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, } from 'react';
import {ApiService} from "@/core/services/ApiService";
import { showAlert } from '@/hooks/useAlerts'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { participantStore } from '@/modules/participant/store/participantStore';
import { JwtService } from '@/core/services/JwtService';

const getParticipant = async (id: any) => {
  const { data } = await ApiService.get(`/participants/index/${id}`);
  return data;
};

const createParticipant = async ({ participant, id }: any) => {
  const url = id ? `/participants` : "/participants";
  const { data } = await ApiService.post(url, participant);
  return data;
};

const deleteParticipant = async (id: any) => {
  const { data } = await ApiService.delete(`/participants/delete/${id}`);
  return data;
};

export const useParticipant = () => {
  const queryClient: any = useQueryClient();
  const {
    participant,
    idParticipant,
    setIdParticipant,
    bodyParticipant,
    setParticipant,
    clearParticipant,
    getDefaultParticipant
  } = participantStore();

  // Query para obtener participante
  const { isLoading, isError, error, data: participantData } = useQuery({
    queryKey: ['participant', idParticipant],
    queryFn: () => getParticipant(idParticipant),
    staleTime: 0,
    gcTime: 0,
    enabled: !!idParticipant
  });

   useEffect(() => {
    if (participantData) {
      setParticipant(participantData.data.attributes);
      participantStore.setState({ idParticipant: null });
    }
  }, [participantData, setParticipant]);

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
  const participantMutation = useMutation({
    mutationFn: createParticipant,
    onSuccess: (data) => {
      console.log("🚀 ~ useProject ~ data:", data)
      clearParticipant();
      showAlert('success', data.message);
      queryClient.invalidateQueries(['participants']); // Invalida y refetch
    },
    onError: (error) => {
       const err = error as { response?: { data?: { detail?: string } } };
      const detail = err.response?.data?.detail;
      if (detail) {
        showAlert('error', detail);
      }
    }
  });

  const deleteParticipantMutation = useMutation({
    mutationFn: deleteParticipant,
    onSuccess: (data) => {
      clearParticipant();
      showAlert('success', data.message);
      queryClient.invalidateQueries(['participants']); // Invalida y refetch
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
    participant,
    idParticipant,
    bodyParticipant,
    clearParticipant,
    isLoading,
    isError,
    error,
    getDefaultParticipant,
    setParticipant,
    setIdParticipant,

    createParticipant: participantMutation.mutate,
    deleteParticipant: deleteParticipantMutation.mutate,
    isUpdating: participantMutation.isPending || deleteParticipantMutation.isPending,
    isUpdatingSuccess: participantMutation.isSuccess || deleteParticipantMutation.isSuccess,
    isErrorUpdating: participantMutation.isError || deleteParticipantMutation.isError,

    //permissions
    canCreateUsers: JwtService.hasPermissionTo('users', 'crear'),
    canEditUsers: JwtService.hasPermissionTo('users', 'editar'),
    canDeleteUsers: JwtService.hasPermissionTo('users', 'eliminar'),
    canDownloadUsers: JwtService.hasPermissionTo('users', 'descargar'),
  };
};
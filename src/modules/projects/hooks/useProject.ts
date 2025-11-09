/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, } from 'react';
import {ApiService} from "@/core/services/ApiService";
import { showAlert } from '@/hooks/useAlerts'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { projectStore } from '@/modules/projects/store/projectStore';
import { JwtService } from '@/core/services/JwtService';

const getProject = async (id: any) => {
  const { data } = await ApiService.get(`/projects/index/${id}`);
  return data;
};

const createProject = async ({ project, id }: any) => {
  const url = id ? `/projects` : "/projects";
  const { data } = await ApiService.post(url, project);
  return data;
};

const deleteProject = async (id: any) => {
  const { data } = await ApiService.delete(`/projects/delete/${id}`);
  return data;
};

export const useProject = () => {
  const queryClient: any = useQueryClient();
  const {
    project,
    idProject,
    setIdProject,
    bodyProject,
    setProject,
    clearProject,
    getDefaultProject
  } = projectStore();

  // Query para obtener proyecto
  const { isLoading, isError, error, data: projectData } = useQuery({
    queryKey: ['project', idProject],
    queryFn: () => getProject(idProject),
    staleTime: 0,
    gcTime: 0,
    enabled: !!idProject
  });

   useEffect(() => {
    if (projectData) {
      setProject(projectData.data.attributes);
      projectStore.setState({ idProject: null });
    }
  }, [projectData, setProject]);

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
  const projectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      console.log("🚀 ~ useProject ~ data:", data)
      clearProject();
      showAlert('success', data.message);
      queryClient.invalidateQueries(['projects']); // Invalida y refetch
    },
    onError: (error) => {
       const err = error as { response?: { data?: { detail?: string } } };
      const detail = err.response?.data?.detail;
      if (detail) {
        showAlert('error', detail);
      }
    }
  });

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: (data) => {
      clearProject();
      showAlert('success', data.message);
      queryClient.invalidateQueries(['projects']); // Invalida y refetch
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
    project,
    idProject,
    bodyProject,
    clearProject,
    isLoading,
    isError,
    error,
    getDefaultProject,
    setProject,
    setIdProject,

    createProject: projectMutation.mutate,
    deleteProject: deleteProjectMutation.mutate,
    isUpdating: projectMutation.isPending || deleteProjectMutation.isPending,
    isUpdatingSuccess: projectMutation.isSuccess || deleteProjectMutation.isSuccess,
    isErrorUpdating: projectMutation.isError || deleteProjectMutation.isError,

    //permissions
    canCreateUsers: JwtService.hasPermissionTo('users', 'crear'),
    canEditUsers: JwtService.hasPermissionTo('users', 'editar'),
    canDeleteUsers: JwtService.hasPermissionTo('users', 'eliminar'),
    canDownloadUsers: JwtService.hasPermissionTo('users', 'descargar'),
  };
};
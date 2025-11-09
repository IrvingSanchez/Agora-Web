/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import { JwtService } from '@/core/services/JwtService'

export const projectStore: any = create(devtools((set) => {

  const getDefaultProject = () => ({
    title: "",
    description: "",
    ownerId: JwtService.getUserId() || "",
    budget: {
      total: '',
      currency: ""
    },
    participants: [],
    phases: []
  });

  

  const initialState = {
    project: getDefaultProject(),
    idProject: null,
    bodyProject: {
      ...getDefaultProject()
    },
    getDefaultProject
  };

  return {
    ...initialState,

    setProject: (data: any) => set((state: any) => {
      const dataProject = {
        title: data.title || "",
        description: data.description || "",
        ownerId: data.ownerId || "",
        budget: {
          total: data.budget?.total || '',
          currency: data.budget?.currency || ""
        },
        participants: data.participants || [],
        phases: data.phases || []
      };
      return {
        project: {...state.bodyProject, ...dataProject},
      };
    }),

    setIdProject: (id: any) => set({ idProject: id }),
    clearProject: () => set(() => ({
      project: getDefaultProject(),
      bodyProject: {
        ...getDefaultProject()
      }
    }))
  };
}));
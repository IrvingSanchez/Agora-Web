/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

export const useUsersStore: any = create(devtools((set) => {
  // Función auxiliar para filtros
  const getDefaultFilter = () => ({
     search: "",
      status: "",
  });

  // Estado inicial
  const initialState = {
    currentPage: 1,
    from: 1,
    lastPage: 1,
    perPage: 6,
    to: 1,
    total: 1,
    users: [],
    filters: getDefaultFilter(),
    filtesParams: ''
  };

  return {
    ...initialState,
    
    // Métodos de actualización
    setCurrentPage: (page: any) => set({ currentPage: page }),
    setFrom: (value: any) => set({ from: value }),
    setLastPage: (value: any) => set({ lastPage: value }),
    setPerPage: (value: any) => set({ perPage: value }),
    setTo: (value: any) => set({ to: value }),
    setTotal: (value: any) => set({ total: value }),
    setUsers: (data: any) => set({ users: data }),

    // Método complejo para filtros
    setFilter: (filters: any) => {
      set({
        filters: {...filters},
      });
      const formatFilterValue = (key: string, value: any) => `&${key}=${value}`;
      
      set((state:any) => {
        let newParams = '';
        Object.entries(state.filters).forEach(([key, value]) => {
          if (value) newParams += formatFilterValue(key, value);
        });
        
        return {
          currentPage: 1,
          filtesParams: newParams
        };
      });
    },

    // Opcional: Resetear a estado inicial
    reset: () => set(initialState),

    resetFilters: () => set({
      filters: {...getDefaultFilter()},
      filtesParams: ''
    }),
  };
}));
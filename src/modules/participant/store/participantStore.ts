/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware'


export const participantStore: any = create(devtools((set) => {

  const getDefaultParticipant = () => ({
    userId: "",
    rol: ""
  });

  

  const initialState = {
    participant: getDefaultParticipant(),
    idParticipant: null,
    bodyParticipant: {
      ...getDefaultParticipant()
    },
    getDefaultParticipant
  };

  return {
    ...initialState,

    setParticipant: (data: any) => set((state: any) => {
      const dataParticipant = {
        userId: data.userId || "",
        rol: data.rol || ""
      };
      return {
        participant: {...state.bodyParticipant, ...dataParticipant},
      };
    }),

    setIdParticipant: (id: any) => set({ idParticipant: id }),
    clearParticipant: () => set(() => ({
      participant: getDefaultParticipant(),
      bodyParticipant: {
        ...getDefaultParticipant()
      }
    }))
  };
}));
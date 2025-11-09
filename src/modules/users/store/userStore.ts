/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

export const userStore: any = create(devtools((set) => {

  const getDefaultUser = () => ({
    name: { 
      first: "",
      last: ""
    },
    email: "",
    phone: "",
    wallet: {
      currency: "",
      provider: "",
      interledgerAddress: "",
      publicKey: "",
      balance: ""
    }
  });

  

  const initialState = {
    user: getDefaultUser(),
    idUser: null,
    bodyUser: {
      ...getDefaultUser()
    },
    getDefaultUser
  };

  return {
    ...initialState,

    setUser: (data: any) => set((state: any) => {
      const dataUser = {
        name: {
          first: data.name?.first || "",
          last: data.name?.last || ""
        },
        email: data.email || "",
        phone: data.phone || "",
        status: data.status || "active",
        wallet: {
          currency: data.wallet?.currency || "MXN",
          provider: data.wallet?.provider || "InterledgerTestNet",
          interledgerAddress: data.wallet?.interledgerAddress || null,
          publicKey: data.wallet?.publicKey || null,
          balance: data.wallet?.balance || 0
        }
      };
      return {
        user: {...state.bodyUser, ...dataUser},
      };
    }),

    setIdUser: (id: any) => set({ idUser: id }),

    clearUser: () => set(() => ({
      user: getDefaultUser(),
      bodyUser: {
        ...getDefaultUser()
      }
    }))
  };
}));
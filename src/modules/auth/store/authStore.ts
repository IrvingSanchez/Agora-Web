/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { JwtService } from '@/core/services/JwtService'
// import { ApiService } from '@/core/services/ApiService'

export const useAuthStore = create(devtools((set) => ({
  sesion: JwtService.getUser(),
  
  setUser: (userData:any) => {
    const sesion = {
      isAuth: true,
      user: `${userData.name?.first} ${userData.name?.last}`,
      email: userData.email,
      wallet: userData.wallet
    }
    set({ sesion })
    JwtService.saveToken(userData.token)
    JwtService.savePermissions(userData.permissions)
    JwtService.saveUser(sesion)
    JwtService.saveUserId(userData.id)
  },
  
  logout: () => {
    set({ sesion: {} })
    JwtService.clearSession()
  },

})))
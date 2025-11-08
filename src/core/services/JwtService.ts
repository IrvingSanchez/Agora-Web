/* eslint-disable @typescript-eslint/no-explicit-any */
// import CryptoJS from 'crypto-js'

const ID_TOKEN_KEY = "id_token";
const ID_PERMISSIONS_KEY = "permissions";

interface User {
  [key: string]: unknown;
}

export const JwtService = {
  getToken: (): string | null => localStorage.getItem(ID_TOKEN_KEY),
  saveToken: (token: string): void => localStorage.setItem(ID_TOKEN_KEY, token),
  saveRefreshToken: (refresh: string): void => localStorage.setItem('refresh_token', refresh),
  getRefreshToken: (): string | null => localStorage.getItem('refresh_token'),
  destroyToken: (): void => localStorage.removeItem(ID_TOKEN_KEY),
  
  saveUser: (user: User): void => localStorage.setItem('user', JSON.stringify(user)),
  getUser: (): User => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : {};
  },

  
  hasPermissionTo: (module: string, action: string): boolean => {
    const permissions = JwtService.getPermissions();
    if (!permissions) {
      return false;
    }
   
    try {
      // Parseamos el string de permisos a un array de objetos
      const permissionsArray = JSON.parse(permissions);

      // Verificamos que sea un array válido
      if (!Array.isArray(permissionsArray)) {
        console.warn("Permissions is not a valid array");
        return false;
      }

      // Filtramos por módulo y luego buscamos la acción específica
      const modulePermissions = permissionsArray.filter(
        (permission: any) => permission.module === module
      );

      // Verificamos si existe el permiso específico para esa acción
      const hasPermission = modulePermissions?.[0]?.actions.some(
        (permission: any) => permission === action
      );

      return hasPermission;
    } catch (error) {
      console.error("Error parsing permissions:", error);
      return false;
    }
  },
  getPermissions: (): string | null => localStorage.getItem(ID_PERMISSIONS_KEY),
  savePermissions: (permissions: string): void => localStorage.setItem(ID_PERMISSIONS_KEY, JSON.stringify(permissions)),
  destroyPermissions: (): void => localStorage.removeItem(ID_PERMISSIONS_KEY),

  clearSession: (): void => {
    localStorage.removeItem(ID_TOKEN_KEY);
    localStorage.removeItem(ID_PERMISSIONS_KEY);
    localStorage.removeItem('user');
  }
};
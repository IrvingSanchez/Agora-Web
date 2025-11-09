/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { JwtService } from '@/core/services/JwtService';

/**
 * Hook para manejar validaciones de permisos de módulos
 */
export const useModulePermissions = () => {
  const navigate = useNavigate();

  /**
   * Verifica si un módulo está activo basado en los permisos del usuario
   * @param module - Ruta del módulo a verificar
   * @param redirectOnFail - Si debe redirigir cuando no tiene permisos (default: false)
   * @returns boolean - true si tiene permisos, false si no los tiene
   */
  const moduleIsActive = useCallback((module: any, redirectOnFail: boolean = false): boolean => {
    // Obtener el nombre del módulo desde la ruta
    const pathname = (module === '/admin' || module === '/admin/') ? 'home' : module.substring(7); // Remover '/admin/' del inicio
    const pathSegments = pathname.split('/');
    const currentModule = pathSegments[0];
    const action = 'ver'; // Acción por defecto para acceso a la ruta
    
    // Verificar permisos
    const hasPermission = JwtService.hasPermissionTo(currentModule, action);
    
    // Redirigir si no tiene permisos y está habilitada la redirección
    if (!hasPermission && redirectOnFail) {
      console.log("🚀 ~ moduleIsActive ~ hasPermission:", hasPermission);
      navigate('/admin', { replace: true });
      return false;
    }
    
    return hasPermission;
  }, [navigate]);

  return {
    moduleIsActive
  };
};

/**
 * Función utilitaria para verificar permisos sin hooks (para uso en componentes de clase o contextos sin hooks)
 * @param module - Ruta del módulo a verificar
 * @returns boolean - true si tiene permisos, false si no los tiene
 */
export const checkModulePermissions = (module: any): boolean => {
  const pathname = (module === '/admin' || module === '/admin/') ? 'home' : module.substring(7);
  const pathSegments = pathname.split('/');
  const currentModule = pathSegments[0];
  const action = 'ver';
  
  return JwtService.hasPermissionTo(currentModule, action);
};
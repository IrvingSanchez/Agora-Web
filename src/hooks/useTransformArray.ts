import { useMemo } from 'react';

/**
 * Hook personalizado para transformar un array de objetos en un formato compatible con selects
 * @param array - Array de objetos a transformar
 * @param valueKey - Nombre de la propiedad que se usará como 'value'
 * @param labelKey - Nombre de la propiedad que se usará como 'label'
 * @returns Array transformado con formato { value: any, label: any }
 */
export const useTransformArray = <T extends Record<string, unknown>>(
  array: T[],
  valueKey: keyof T,
  labelKey: keyof T
) => {
  return useMemo(() => {
    if (!Array.isArray(array)) {
      return [];
    }

    return array.map((item) => ({
      value: item[valueKey],
      label: item[labelKey],
      // Opcional: mantener el objeto original para referencia
      original: item
    }));
  }, [array, valueKey, labelKey]);
};

/**
 * Función utilitaria para transformar arrays (sin memoización)
 * @param array - Array de objetos a transformar
 * @param valueKey - Nombre de la propiedad que se usará como 'value'
 * @param labelKey - Nombre de la propiedad que se usará como 'label'
 * @returns Array transformado con formato { value: any, label: any }
 */
export const transformArray = <T extends Record<string, unknown>>(
  array: T[],
  valueKey: keyof T,
  labelKey: keyof T
) => {
  if (!Array.isArray(array)) {
    return [];
  }

  return array.map((item) => ({
    value: item[valueKey],
    label: item[labelKey],
    // Opcional: mantener el objeto original para referencia
    original: item
  }));
};

export default useTransformArray;
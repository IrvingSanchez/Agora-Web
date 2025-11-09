import { useEffect, useState } from 'react';

/**
 * Hook personalizado para aplicar debounce a un valor
 * @param value - El valor a aplicar debounce
 * @param delay - El retraso en milisegundos (por defecto 500ms)
 * @returns El valor después del debounce
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Crear un timer que actualizará el valor después del delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar el timeout si el valor cambia antes de que se cumpla el delay
    // Esto es lo que implementa el comportamiento de debounce
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

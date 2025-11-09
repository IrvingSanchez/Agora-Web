/* eslint-disable @typescript-eslint/no-explicit-any */
export const permissions = [

  { id: 1, module: 'home', actions: ['ver'] },
  { id: 2, module: 'users', actions: ['ver', 'crear', 'editar', 'eliminar'] },
  { id: 3, module: 'projects', actions: ['ver', 'crear', 'editar', 'eliminar'] },
  { id: 4, module: 'profile', actions: ['ver'] },
];


const MockAuth = {
  success: true,
  data: {
    user: {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      institution_id: 1
    },
    access_token: "mock_access_token_1234567890",
  },
};

// Función mock para desarrollo
export const getMockAuth = async (): Promise<any> => {
  // Simulamos un delay para que se vea el loading
  await new Promise(resolve => setTimeout(resolve, 200));

  // Filtramos las llaves según los filtros (simulado)
 const data = MockAuth.data;

  try {

    // Retornamos el formato esperado
    return {
      success: true,
      message: "Autenticación exitosa (mock)",
      data
    };
  } catch (error) {
    console.error('Error en mock data:', error);
    throw error;
  }
};

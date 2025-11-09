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
      id: "usr_2ee17d14-827e-4251-849c-779be718f7ce",
      name: {
        first: "Fredy",
        last: "Nazario"
      },
      email: "fredynn@hotmail.com",
      phone: "5511467342",
      wallet: {
        interledgerAddress: null,
        publicKey: null,
        currency: "mxn",
        provider: "interledger",
        balance: 0
      },
      status: "active",
      createdAt: "2025-11-09T05:05:05.906Z",
      updatedAt: "2025-11-09T05:05:05.906Z"
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

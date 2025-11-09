/* eslint-disable @typescript-eslint/no-explicit-any */
interface UserName {
  first: string;
  last: string;
}

interface Wallet {
  balance: number | string;
  currency: string;
  provider: string;
}

interface User {
  id: string;
  name: UserName;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  wallet: Wallet;
}

// Mock data para desarrollo
const mockUsers: User[] = [
        {
            "createdAt": "2025-11-09T02:51:46.457Z",
            "email": "miguel.zavala@example.com",
            "id": "usr_08f092fb-7fe9-4bdf-a0f9-15d878065cff",
            "name": {
                "first": "Miguel",
                "last": "Zavala Ventura"
            },
            "phone": "+52 555 123 4567",
            "status": "active",
            "updatedAt": "2025-11-09T02:51:46.460Z",
            "wallet": {
                "balance": "0",
                "currency": "MXN",
                "provider": "InterledgerTestNet"
            }
        },
        {
            "createdAt": "2025-11-09T02:56:03.552Z",
            "email": "john.updated@example.com",
            "id": "usr_57ea3206-3e72-414e-b5ab-9f06b4993109",
            "name": {
                "first": "John",
                "last": "Updated"
            },
            "phone": "+52 555 123 4567",
            "status": "active",
            "updatedAt": "2025-11-09T03:05:58.364Z",
            "wallet": {
                "balance": "0",
                "currency": "MXN",
                "provider": "InterledgerTestNet"
            }
        },
        {
            "createdAt": "2025-11-09T02:55:06.042Z",
            "email": "test.dev@example.com",
            "id": "usr_8df9da71-1bbc-41f0-99d6-3034a9a1cbaa",
            "name": {
                "first": "fredy test",
                "last": "Desde dev"
            },
            "phone": "+52 555 123 4567",
            "status": "active",
            "updatedAt": "2025-11-09T02:55:06.042Z",
            "wallet": {
                "balance": "0",
                "currency": "MXN",
                "provider": "InterledgerTestNet"
            }
        },
        {
            "createdAt": "2025-11-09T02:13:57.478Z",
            "email": "miguel.zavala@example.com",
            "id": "usr_a016c454-bbab-468e-82cc-aec1a83871d1",
            "name": {
                "first": "Miguel",
                "last": "Zavala Ventura"
            },
            "phone": "+52 555 123 4567",
            "status": "active",
            "updatedAt": "2025-11-09T02:13:57.479Z",
            "wallet": {
                "balance": "0",
                "currency": "MXN",
                "provider": "InterledgerTestNet"
            }
        },
        {
            "createdAt": "2025-11-09T02:14:10.123Z",
            "email": "laura.hernandez@example.com",
            "id": "usr_b1f6d812-93a2-4d2a-8f9a-0b71a0c6f1d2",
            "name": {
                "first": "Laura",
                "last": "Hernández Ruiz"
            },
            "phone": "+52 555 234 5678",
            "status": "active",
            "updatedAt": "2025-11-09T02:14:10.124Z",
            "wallet": {
                "balance": "0",
                "currency": "MXN",
                "provider": "InterledgerTestNet"
            }
        },
        {
            "createdAt": "2025-11-09T02:14:20.653Z",
            "email": "carlos.jimenez@example.com",
            "id": "usr_c83ab10f-8f56-4f4f-9e4e-93e4af2ef211",
            "name": {
                "first": "Carlos",
                "last": "Jiménez Torres"
            },
            "phone": "+52 555 345 6789",
            "status": "active",
            "updatedAt": "2025-11-09T02:14:20.654Z",
            "wallet": {
                "balance": "0",
                "currency": "MXN",
                "provider": "InterledgerTestNet"
            }
        },
        {
            "createdAt": "2025-11-09T02:14:30.982Z",
            "email": "ana.perez@example.com",
            "id": "usr_d7b0a453-213a-4c2b-9c9d-1e2b7c6c341a",
            "name": {
                "first": "Ana",
                "last": "Pérez López"
            },
            "phone": "+52 555 456 7890",
            "status": "active",
            "updatedAt": "2025-11-09T02:14:30.983Z",
            "wallet": {
                "balance": "0",
                "currency": "MXN",
                "provider": "InterledgerTestNet"
            }
        },
        {
            "createdAt": "2025-11-09T02:14:41.354Z",
            "email": "javier.moreno@example.com",
            "id": "usr_e213c98a-1189-4bde-85d0-ec876f9a123c",
            "name": {
                "first": "Javier",
                "last": "Moreno Díaz"
            },
            "phone": "+52 555 567 8901",
            "status": "active",
            "updatedAt": "2025-11-09T02:14:41.355Z",
            "wallet": {
                "balance": "0",
                "currency": "MXN",
                "provider": "InterledgerTestNet"
            }
        },
        {
            "createdAt": "2025-11-09T02:14:52.011Z",
            "email": "sofia.martinez@example.com",
            "id": "usr_f456ab98-7345-49de-b23a-81a0d4d83a11",
            "name": {
                "first": "Sofía",
                "last": "Martínez Castillo"
            },
            "phone": "+52 555 678 9012",
            "status": "active",
            "updatedAt": "2025-11-09T02:14:52.012Z",
            "wallet": {
                "balance": "0",
                "currency": "MXN",
                "provider": "InterledgerTestNet"
            }
        },
        {
            "createdAt": "2025-11-09T02:15:02.874Z",
            "email": "diego.ramirez@example.com",
            "id": "usr_g987cc45-29b7-41a4-a4b2-94f3d9e6e3f2",
            "name": {
                "first": "Diego",
                "last": "Ramírez Ponce"
            },
            "phone": "+52 555 789 0123",
            "status": "active",
            "updatedAt": "2025-11-09T02:15:02.875Z",
            "wallet": {
                "balance": "0",
                "currency": "MXN",
                "provider": "InterledgerTestNet"
            }
        },
        {
            "createdAt": "2025-11-09T02:15:14.438Z",
            "email": "valeria.santos@example.com",
            "id": "usr_h654dd11-5a77-41de-8c20-7c913b4b2f22",
            "name": {
                "first": "Valeria",
                "last": "Santos Aguilar"
            },
            "phone": "+52 555 890 1234",
            "status": "active",
            "updatedAt": "2025-11-09T02:15:14.439Z",
            "wallet": {
                "balance": "0",
                "currency": "MXN",
                "provider": "InterledgerTestNet"
            }
        },
        {
            "createdAt": "2025-11-09T02:15:25.909Z",
            "email": "fernando.garcia@example.com",
            "id": "usr_i128ff34-2e67-47bc-8549-9f70e1e3f7c5",
            "name": {
                "first": "Fernando",
                "last": "García Herrera"
            },
            "phone": "+52 555 901 2345",
            "status": "active",
            "updatedAt": "2025-11-09T02:15:25.910Z",
            "wallet": {
                "balance": "0",
                "currency": "MXN",
                "provider": "InterledgerTestNet"
            }
        },
        {
            "createdAt": "2025-11-09T02:15:37.217Z",
            "email": "lucia.flores@example.com",
            "id": "usr_j312ae88-1b88-4bbf-928f-2c76f25a6b1f",
            "name": {
                "first": "Lucía",
                "last": "Flores Mendoza"
            },
            "phone": "+52 555 012 3456",
            "status": "active",
            "updatedAt": "2025-11-09T02:15:37.218Z",
            "wallet": {
                "balance": "0",
                "currency": "MXN",
                "provider": "InterledgerTestNet"
            }
        }
    ]
// Función mock para desarrollo
export const getMockUsers = async (filters: string): Promise<any> => {
  // Simulamos un delay para que se vea el loading
  await new Promise(resolve => setTimeout(resolve, 100));

  // Filtramos los usuarios según los filtros (simulado)
  let filteredUsers = [...mockUsers];

  try {
    if (filters) {
      const searchParams = new URLSearchParams(filters);
      const search = searchParams.get('search');
      const status = searchParams.get('status');

      if (search) {
        filteredUsers = filteredUsers.filter(user => 
          `${user.name.first} ${user.name.last}`.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (status) {
        console.log("🚀 ~ getMockUsers ~ status:", status)
        filteredUsers = filteredUsers.filter(user => 
          user.status.toLowerCase() === status.toLowerCase()
        );
      }
    }

    // Calculamos la paginación
    const totalUsers = filteredUsers.length;
    

    // Retornamos el formato esperado
    return {
      success: true,
      message: "users list successful",
      data: {
        attributes: {
          data: filteredUsers,
          pagination: {
            total: totalUsers
          }
        }
      }
    };
  } catch (error) {
    console.error('Error en mock data:', error);
    throw error;
  }
};
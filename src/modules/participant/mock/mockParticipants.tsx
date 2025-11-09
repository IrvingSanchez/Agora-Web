/* eslint-disable @typescript-eslint/no-explicit-any */


// Mock data para desarrollo
export const mockParticipants: any[] = [
  {
    userId: "usr_2cec15aa-3427-4573-9efb-63a6a5091372",
    name: "Juan López",
    email: "juan.lopez@email.com",
    rol: "sender",
    projectId: "prj_1a7d5f90-4a9b-4a44-b1a7-80c1c22e7310",
    status: "active"
  },
  {
    userId: "usr_a016c454-bbab-468e-82cc-aec1a83871d1",
    name: "María García",
    email: "maria.garcia@email.com",
    rol: "receiver",
    projectId: "prj_2b5c3e12-1d33-4b8a-9c3a-74a822d9b2de",
    status: "active"
  },
  {
    userId: "usr_b1f6d812-93a2-4d2a-8f9a-0b71a0c6f1d2",
    name: "Carlos Ramírez",
    email: "carlos.ramirez@email.com",
    rol: "validator",
    projectId: "prj_3c1f9a21-3e4d-4f56-9f88-92d9ef8a4b21",
    status: "pending"
  }
];

// Tipos de roles disponibles
export const participantRoles = [
  { value: "sender", label: "Remitente" },
  { value: "receiver", label: "Receptor" },
  { value: "validator", label: "Validador" }
];

// Estados disponibles para participantes
export const participantStatuses = [
  { value: "active", label: "Activo" },
  { value: "pending", label: "Pendiente" },
  { value: "inactive", label: "Inactivo" }
];

// Función mock para desarrollo
export const getMockParticipants = async (filters: string): Promise<any> => {
  // Simulamos un delay para que se vea el loading
  await new Promise(resolve => setTimeout(resolve, 100));

  // Filtramos los usuarios según los filtros (simulado)
  let filteredParticipants = [...mockParticipants];

  try {
    if (filters) {
      const searchParams = new URLSearchParams(filters);
      const search = searchParams.get('search');


      if (search) {
        filteredParticipants = filteredParticipants.filter(participant => 
          `${participant.name.first} ${participant.name.last}`.toLowerCase().includes(search.toLowerCase()) ||
          participant.email.toLowerCase().includes(search.toLowerCase())
        );
      }
      
    }

    // Calculamos la paginación
    const totalParticipants = filteredParticipants.length;
    

    // Retornamos el formato esperado
    return {
      success: true,
      message: "users list successful",
          data: filteredParticipants,
          pagination: {
            total: totalParticipants
          }
    };
  } catch (error) {
    console.error('Error en mock data:', error);
    throw error;
  }
};
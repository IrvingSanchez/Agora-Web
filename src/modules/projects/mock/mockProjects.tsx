/* eslint-disable @typescript-eslint/no-explicit-any */

// Mock data para desarrollo
const mockProjects: any[] = [
  {
    "id": "prj_1a7d5f90-4a9b-4a44-b1a7-80c1c22e7310",
    "title": "Construcción de vivienda para familia López",
    "description": "Proyecto de vivienda financiado a distancia, con control de entregas y pagos verificados.",
    "ownerId": "usr_2cec15aa-3427-4573-9efb-63a6a5091372",
    "budget": { "total": 250000, "currency": "MXN" },
    "participants": [
      { "userId": "usr_2cec15aa-3427-4573-9efb-63a6a5091372", "rol": "sender" }
    ],
    "phases": []
  },
  {
    "id": "prj_2b5c3e12-1d33-4b8a-9c3a-74a822d9b2de",
    "title": "Rehabilitación de escuela primaria en Oaxaca",
    "description": "Campaña de reconstrucción de aulas y sanitarios para mejorar condiciones educativas.",
    "ownerId": "usr_a016c454-bbab-468e-82cc-aec1a83871d1",
    "budget": { "total": 180000, "currency": "MXN" },
    "participants": [
      { "userId": "usr_a016c454-bbab-468e-82cc-aec1a83871d1", "rol": "sender" }
    ],
    "phases": []
  },
  {
    "id": "prj_3c1f9a21-3e4d-4f56-9f88-92d9ef8a4b21",
    "title": "Planta solar comunitaria en Baja California",
    "description": "Proyecto colaborativo para instalar paneles solares y reducir costos de energía local.",
    "ownerId": "usr_b1f6d812-93a2-4d2a-8f9a-0b71a0c6f1d2",
    "budget": { "total": 320000, "currency": "MXN" },
    "participants": [
      { "userId": "usr_b1f6d812-93a2-4d2a-8f9a-0b71a0c6f1d2", "rol": "sender" }
    ],
    "phases": []
  },
  {
    "id": "prj_4d9a8e31-09d1-4ff7-8b5f-07f1d05d3e90",
    "title": "Pozo de agua potable en comunidad rural",
    "description": "Iniciativa para construir un pozo de agua con participación local y transparencia total.",
    "ownerId": "usr_c83ab10f-8f56-4f4f-9e4e-93e4af2ef211",
    "budget": { "total": 150000, "currency": "MXN" },
    "participants": [
      { "userId": "usr_c83ab10f-8f56-4f4f-9e4e-93e4af2ef211", "rol": "sender" }
    ],
    "phases": []
  },
  {
    "id": "prj_5e2f1b44-2b42-49ff-9d0a-44b6e0e84235",
    "title": "Apoyo a microempresarias en Chiapas",
    "description": "Fondo rotativo para impulsar pequeños negocios liderados por mujeres rurales.",
    "ownerId": "usr_d7b0a453-213a-4c2b-9c9d-1e2b7c6c341a",
    "budget": { "total": 100000, "currency": "MXN" },
    "participants": [
      { "userId": "usr_d7b0a453-213a-4c2b-9c9d-1e2b7c6c341a", "rol": "sender" }
    ],
    "phases": []
  },
  {
    "id": "prj_6f8e7a12-883f-489f-b62f-6c7b21fae9f1",
    "title": "Centro cultural comunitario en Puebla",
    "description": "Creación de un espacio para talleres de arte, música y tecnología para jóvenes.",
    "ownerId": "usr_e213c98a-1189-4bde-85d0-ec876f9a123c",
    "budget": { "total": 275000, "currency": "MXN" },
    "participants": [
      { "userId": "usr_e213c98a-1189-4bde-85d0-ec876f9a123c", "rol": "sender" }
    ],
    "phases": []
  },
  {
    "id": "prj_7a3b4f98-4e91-4b6e-98b3-dc25a99b4f23",
    "title": "Huerto urbano sustentable en Monterrey",
    "description": "Proyecto educativo para enseñar agricultura urbana en espacios reducidos.",
    "ownerId": "usr_f456ab98-7345-49de-b23a-81a0d4d83a11",
    "budget": { "total": 85000, "currency": "MXN" },
    "participants": [
      { "userId": "usr_f456ab98-7345-49de-b23a-81a0d4d83a11", "rol": "sender" }
    ],
    "phases": []
  },
  {
    "id": "prj_8c4f1a55-9b28-4695-9d5f-18a48e3d9f77",
    "title": "Reforestación de la Sierra Madre",
    "description": "Campaña de reforestación y educación ambiental con seguimiento satelital.",
    "ownerId": "usr_g987cc45-29b7-41a4-a4b2-94f3d9e6e3f2",
    "budget": { "total": 220000, "currency": "MXN" },
    "participants": [
      { "userId": "usr_g987cc45-29b7-41a4-a4b2-94f3d9e6e3f2", "rol": "sender" }
    ],
    "phases": []
  },
  {
    "id": "prj_9b7e2f11-71a4-4a88-81f3-3cf64b2e2c98",
    "title": "Programa de becas tecnológicas",
    "description": "Fondo para financiar estudios de jóvenes en áreas STEM con tutorías remotas.",
    "ownerId": "usr_h654dd11-5a77-41de-8c20-7c913b4b2f22",
    "budget": { "total": 400000, "currency": "MXN" },
    "participants": [
      { "userId": "usr_h654dd11-5a77-41de-8c20-7c913b4b2f22", "rol": "sender" }
    ],
    "phases": []
  },
  {
    "id": "prj_10d3e678-27b9-4f1c-a4c5-7f3b3dbcd234",
    "title": "Red de agua pluvial para barrio sustentable",
    "description": "Sistema de captación de agua de lluvia para reducir consumo doméstico.",
    "ownerId": "usr_i128ff34-2e67-47bc-8549-9f70e1e3f7c5",
    "budget": { "total": 195000, "currency": "MXN" },
    "participants": [
      { "userId": "usr_i128ff34-2e67-47bc-8549-9f70e1e3f7c5", "rol": "sender" }
    ],
    "phases": []
  }
]

// Función mock para desarrollo
export const getMockProjects = async (filters: string): Promise<any> => {
  // Simulamos un delay para que se vea el loading
  await new Promise(resolve => setTimeout(resolve, 100));

  // Filtramos los usuarios según los filtros (simulado)
  let filteredProjects = [...mockProjects];

  try {
    if (filters) {
      const searchParams = new URLSearchParams(filters);
      const search = searchParams.get('search');


      if (search) {
        filteredProjects = filteredProjects.filter(project => 
          `${project.name.first} ${project.name.last}`.toLowerCase().includes(search.toLowerCase()) ||
          project.email.toLowerCase().includes(search.toLowerCase())
        );
      }
      
    }

    // Calculamos la paginación
    const totalProjects = filteredProjects.length;
    

    // Retornamos el formato esperado
    return {
      success: true,
      message: "users list successful",
          data: filteredProjects,
          pagination: {
            total: totalProjects
          }
    };
  } catch (error) {
    console.error('Error en mock data:', error);
    throw error;
  }
};
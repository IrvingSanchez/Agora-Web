/* eslint-disable @typescript-eslint/no-explicit-any */
// 📁 Imports
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { alertDefaultWithImage } from "@/hooks/useAlerts";
import { ProjectsTable } from "../components/ProjectsTable";
import { Loader } from "@/components/shared/Loader";
import ProyectsFilter from "../components/forms/ProyectsFilter";
import { useProjects } from "@/modules/projects/hooks/useProjects";
import { useProject } from "@/modules/projects/hooks/useProject";
import { ProjectModal } from "../components/forms/ProjectFormModal";
import { ApiService } from "@/core/services/ApiService";





// 📄 Componente principal
const AdminProjectsView = ()  => {
  // 🔁 Estados y hooks
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [ typeForm, setTypeForm ] = useState("project");
    const [isLoadingPay, setIsLoadingPay] = useState(false);
  
  // Manejar el parámetro redirect
  useEffect(() => {
    const redirect = searchParams.get('redirect');
    if (redirect === 'true') {
      setTypeForm("pay");
      // Abrir el modal automáticamente
      setIsModalOpen(true);
      // Limpiar el parámetro de la URL
      navigate('.', { replace: true });
      
    }
  }, [searchParams, navigate]);

  const {
    filters,
    setfilter,
    resetFilters,
    projects,
    isLoading,
  } = useProjects();

  const {
    project,
    isLoading: isProjectLoading,
    createProject, 
    // setIdProject, 
    setProject,
    clearProject,
    deleteProject,

    //permissions
    canCreateUsers,
    canEditUsers,
    canDeleteUsers,
    canDownloadUsers,
  } = useProject();



  // 🧠 Efectos
const [isModalOpen, setIsModalOpen] = useState(false);
 
const handleCreate = (type = "project") => {
    setTypeForm(type);
    setIsModalOpen(true);
  };
 
  const handleModalClose = () => {
    clearProject();
    setIsModalOpen(false);
  };

  const handleFormSuccess = (values: any) => {
 
    const {id, ...projectData} = values;
    createProject({ project: projectData, id });
    handleModalClose();
    // Aquí podrías actualizar la lista de usuarios si es necesario
  };

 
   const editProject = (project: any) => {
    console.log("🚀 ~ editProject ~ project:", project);
    // setIdProject(project.id);
    setProject(project);
    setIsModalOpen(true);
  };

  const deletProject = (id: any) => {
    console.log("🚀 ~ deletProject ~ id:", id);
    deleteProject(id);
  };

  const download = () => {
    // Lógica para descargar el reporte
    console.log("Descargando reporte...");
  }

  const confirmSend = async(values: any) => {
    try {
    setIsLoadingPay(true);
    const  { data } = await ApiService.post('/commit/grant/finalize', values)
    console.log("🚀 ~ handleFormSuccess ~ response:", data);
     alertDefaultWithImage('¡Éxito!', 'Gracias por tu donación', '/src/assets/images/successgif.gif', 5000)
    handleModalClose();
    setIsLoadingPay(false);
   } catch (error) {
    console.error("Error al procesar la donación:", error);
    setIsLoadingPay(false);
   }
   
  }


  // 🖼️ Render
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
          <>
            <div className="p-16 max-w-[1000px] mx-auto">

                <h4 className=" font-bold text-gray-800">Proyectos</h4>
                <p className="text-gray-600 mt-4">
                  Aqui encontraras la lista de proyectos a los que te puedes unir o en los que estas participando.
                </p>

            </div>
            <div className="bg-white rounded-lg shadow p-16 pt-24 max-w-[1000px] mx-auto">
              {canCreateUsers && (
                <button
                onClick={() => handleCreate("project")}
                className=" ml-auto btn-primary"
              >
                Añadir Proyecto
                <Icon icon="mdi:plus" width="20" height="20" />
              </button>
              )}
              {/* <h5>Colaboradores</h5> */}

              {/* Cuerpo principal */}

              <div className="mt-8">


                <ProyectsFilter
                  onFilterChange={setfilter}
                  resetFilters={resetFilters}
                  initialValues={{ ...filters }}
                  onDownload={download}
                  canDownload={canDownloadUsers}
                  className="mb-4"
                />

                <ProjectsTable
                  projects={projects}
                  onEdit={editProject}
                  onDelete={deletProject}
                  canEdit={canEditUsers}
                  canDelete={canDeleteUsers}
                />

                {/* <pre>{JSON.stringify(projects, null, 2)}</pre> */}
              </div>

              <ProjectModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                initialData={typeForm === "project" ? project : { receiverWalletAddress: ""}}
                isLoading={isProjectLoading}
                onSubmitSuccess={typeForm === "project" ? handleFormSuccess : confirmSend}
                typeForm={typeForm}
              />
              {isLoadingPay && <Loader background={true} />}
            </div>
          </>
      )}
    </>
  );
};


export default AdminProjectsView;
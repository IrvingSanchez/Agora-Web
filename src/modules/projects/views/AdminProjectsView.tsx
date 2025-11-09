/* eslint-disable @typescript-eslint/no-explicit-any */
// 📁 Imports
import { useState } from "react";
import { Icon } from "@iconify/react";

// import { CardTask } from "@/modules/secureCenter/users/components/cardTask";
import { ProjectsTable } from "../components/UserProjects";
import { Loader } from "@/components/shared/Loader";
import ProyectsFilter from "../components/forms/ProyectsFilter";
import { useProjects } from "@/modules/projects/hooks/useProjects";
import { useProject } from "@/modules/projects/hooks/useProject";
import { ProjectModal } from "../components/forms/ProjectFormModal";




// 📄 Componente principal
const AdminProjectsView = ()  => {
  // 🔁 Estados y hooks

  
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
 
const handleCreate = () => {
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



  // 🖼️ Render
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
          <>
            <div className="p-16 max-w-[1000px] mx-auto">

                <h4 className=" font-bold text-gray-800">Colaboradores</h4>
                <p className="text-gray-600 mt-4">
                  Esta es la lista de las personas que han decidido unirse a nuestra plataforma y contribuir al éxito de nuestros proyectos.
                </p>

            </div>
            <div className="bg-white rounded-lg shadow p-16 pt-24 max-w-[1000px] mx-auto">
              {canCreateUsers && (
                <button
                onClick={handleCreate}
                className=" ml-auto btn-primary"
              >
                Añadir Colaborador
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
                initialData={project}
                isLoading={isProjectLoading}
                onSubmitSuccess={handleFormSuccess}
              />
            </div>
          </>
      )}
    </>
  );
};


export default AdminProjectsView;
/* eslint-disable @typescript-eslint/no-explicit-any */
// 📁 Imports
import { useState } from "react";
import { Icon } from "@iconify/react";

// import { CardTask } from "@/modules/secureCenter/users/components/cardTask";
import { ParticipantsTable } from "../components/ParticipantsTable";
import { Loader } from "@/components/shared/Loader";
import ProyectsFilter from "../components/forms/ProyectsFilter";
import { useParticipants } from "@/modules/participant/hooks/useParticipants";
import { useParticipant } from "@/modules/participant/hooks/useParticipant";
import { ParticipantModal } from "../components/forms/ParticipantFormModal";




// 📄 Componente principal
const ParticipantsView = ()  => {
  // 🔁 Estados y hooks

  
  const {
    filters,
    setfilter,
    resetFilters,
    participants,
    isLoading,
  } = useParticipants();

  const {
    participant,
    isLoading: isParticipantLoading,
    createParticipant, 
    // setIdProject, 
    setParticipant,
    clearParticipant,
    deleteParticipant,
    //permissions
    canCreateUsers,
    canEditUsers,
    canDeleteUsers,
    canDownloadUsers,
  } = useParticipant();



  // 🧠 Efectos
const [isModalOpen, setIsModalOpen] = useState(false);
 
const handleCreate = () => {
    setIsModalOpen(true);
  };
 
  const handleModalClose = () => {
    clearParticipant();
    setIsModalOpen(false);
  };

  const handleFormSuccess = (values: any) => {
 
    const {id, ...participantData} = values;
    createParticipant({ participant: participantData, id });
    handleModalClose();
    // Aquí podrías actualizar la lista de usuarios si es necesario
  };

 
   const editParticipant = (participant: any) => {
    console.log("🚀 ~ editParticipant ~ participant:", participant);
    // setIdProject(project.id);
    setParticipant(participant);
    setIsModalOpen(true);
  };

  const deletParticipant = (id: any) => {
    console.log("🚀 ~ deletParticipant ~ id:", id);
    deleteParticipant(id);
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

                <ParticipantsTable
                  participants={participants}
                  onEdit={editParticipant}
                  onDelete={deletParticipant}
                  canEdit={canEditUsers}
                  canDelete={canDeleteUsers}
                />

                {/* <pre>{JSON.stringify(projects, null, 2)}</pre> */}
              </div>

              <ParticipantModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                initialData={participant}
                isLoading={isParticipantLoading}
                onSubmitSuccess={handleFormSuccess}
              />
            </div>
          </>
      )}
    </>
  );
};


export default ParticipantsView;
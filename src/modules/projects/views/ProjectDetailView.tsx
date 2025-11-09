/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProjects } from "@/modules/projects/hooks/useProjects";
import { useUsers } from "@/modules/users/hooks/useUsers";
import useTransformArray from "@/hooks/useTransformArray";
import ParticipantsView from "@/modules/participant/views/ParticipantsView";
import { SendMoneyModal } from "../components/forms/SendMoneyModal";
import { ApiService } from "@/core/services/ApiService";
import { Loader } from "@/components/shared/Loader";

const ProjectDetailView = () => {
  // Obtener el parámetro projectId de la URL
  const { projectId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = () => {
    setIsModalOpen(true);
  };
 
  const handleModalClose = () => {
    
    setIsModalOpen(false);
  };


    const {
    projects,
    // isLoading,
  } = useProjects();

   const {
    users,
  } = useUsers();

  const userList = useTransformArray(users, 'id', 'email');

  console.log("Usuarios disponibles:", userList);

  const handleFormSuccess = async (values: any) => {
   try {
    setIsLoading(true);
    const  { data } = await ApiService.post('/commit/start', values)
    console.log("🚀 ~ handleFormSuccess ~ response:", data?.futureOutgoingPaymentGrant.interact.redirect)
    
    //abrir la url de redireccionamiento en una nueva pestaña
    window.open(data?.futureOutgoingPaymentGrant.interact.redirect, '_blank');
    
    handleModalClose();
    setIsLoading(false);
   } catch (error) {
    console.error("Error al procesar la donación:", error);
    setIsLoading(false);
   }
   
  }

  //filtart el proyecto por id
  const project = projects.find((p: any) => p.id === projectId);

  return (
    
    project ? (
      <>
      <div className="p-16 max-w-[1000px] mx-auto">
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="flex mt-4">
          <div className="bg-white rounded-lg shadow p-6 mr-4 flex items-center gap-4 ">
            <p className="font-semibold">Presupuesto:</p>
            <p>
              {`${project.budget.total} ${project.budget.currency}`}
            </p>
            <button onClick={handleCreate} className="btn-primary">Donar</button>
          </div>
        </div>
        
      </div>
         <div className="bg-white rounded-lg shadow p-16 pt-8 max-w-[1000px] mx-auto">
          <ParticipantsView listUsers={userList} projectId={projectId} />
        </div>

        <SendMoneyModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          initialData={{
            donorWalletUrl: "",
            debitAmount: ""
          }}
          isLoading={false}
          onSubmitSuccess={handleFormSuccess}
        />
        {isLoading && <Loader background={true} />}
      </>
    ) : (
      <div>
        <h1>Proyecto no encontrado</h1>
        <p>No se encontró ningún proyecto con el ID proporcionado.</p>
      </div>)
  )
};

export default ProjectDetailView;
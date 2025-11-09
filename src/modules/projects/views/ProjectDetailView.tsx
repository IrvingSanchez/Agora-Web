/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useProjects } from "@/modules/projects/hooks/useProjects";
import { useUsers } from "@/modules/users/hooks/useUsers";
import useTransformArray from "@/hooks/useTransformArray";

const ProjectDetailView = () => {
  // Obtener el parámetro projectId de la URL
  const { projectId } = useParams();

    const {
    projects,
    // isLoading,
  } = useProjects();

   const {
    users,
  } = useUsers();

  const userList = useTransformArray(users, 'id', 'name');

  console.log("Usuarios disponibles:", userList);


  //filtart el proyecto por id
  const project = projects.find((p: any) => p.id === projectId);

  return (
    project ? (
      <>
      <div className="p-16 max-w-[1000px] mx-auto">
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="flex mt-4">
          <div className="bg-white rounded-lg shadow p-6 mr-4 flex gap-2 ">
            <p className="font-semibold">Presupuesto:</p>
            <p>
              {`${project.budget.total} ${project.budget.currency}`}
            </p>
          </div>
        </div>
        
      </div>
         <div className="bg-white rounded-lg shadow p-16 pt-24 max-w-[1000px] mx-auto">
        <pre>{JSON.stringify(project, null, 2)}</pre>
        </div>
      </>
    ) : (
      <div>
        <h1>Proyecto no encontrado</h1>
        <p>No se encontró ningún proyecto con el ID proporcionado.</p>
      </div>)
  )
};

export default ProjectDetailView;
/* eslint-disable @typescript-eslint/no-explicit-any */
// 📁 Imports
import { useState } from "react";
import { Icon } from "@iconify/react";

// import { CardTask } from "@/modules/secureCenter/users/components/cardTask";
import { UserTable } from "../components/UserTable";
import { Paginator } from "@/components/shared/table/Paginador";
// import { PerPageSelector } from "@/modules/secureCenter/users/components/PerPageSelector";
import { Loader } from "@/components/shared/Loader";
import UsersFilters from "../components/forms/UsersFilter";
import { useUsers } from "@/modules/users/hooks/useUsers";
import { useUser } from "@/modules/users/hooks/useUser";
import { UserFormModal } from "../components/forms/UserFormModal";


// 📄 Componente principal
const AdminUsersView = ()  => {
  // 🔁 Estados y hooks

  
  const {
    currentPage,
    from,
    lastPage,
    perPage,
    to,
    total,
    getPage,
    // setPerPage,
    filters,
    setfilter,
    resetFilters,
    users,
    isLoading,
  } = useUsers();

  const {
    user,
    isLoading: isUserLoading,
    createUser, 
    // setIdUser, 
    setUser,
    clearUser,
    deleteUser,

    //permissions
    canCreateUsers,
    canEditUsers,
    canDeleteUsers,
    canDownloadUsers,
  } = useUser();


  // 🧠 Efectos
const [isModalOpen, setIsModalOpen] = useState(false);
 
const handleCreate = () => {
    setIsModalOpen(true);
  };
 
  const handleModalClose = () => {
    clearUser();
    setIsModalOpen(false);
  };

  const handleFormSuccess = (values: any) => {
    const {id, ...userData} = values;
    createUser({ user: userData, id });
    handleModalClose();
    // Aquí podrías actualizar la lista de usuarios si es necesario
  };

 
   const editUser = (user: any) => {
    console.log("🚀 ~ editUser ~ user:", user);
    // setIdUser(user.id);
    setUser(user);
    setIsModalOpen(true);
  };

  const deletUser = (id: any) => {
    console.log("🚀 ~ deletUser ~ id:", id);
    deleteUser(id);
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


                <UsersFilters
                  onFilterChange={setfilter}
                  resetFilters={resetFilters}
                  initialValues={{ ...filters }}
                  onDownload={download}
                  canDownload={canDownloadUsers}
                  className="mb-4"
                />

                <UserTable
                  users={users}
                  onEdit={editUser}
                  onDelete={deletUser}
                  canEdit={canEditUsers}
                  canDelete={canDeleteUsers}
                />

                {users.length > 0 && (
                  <div className="mt-12 flex justify-end items-center gap-4">
                    {/* <PerPageSelector
                      perPage={perPage}
                      getPage={getPage}
                      setPerPage={setPerPage}
                      total={total}
                    /> */}
                    <Paginator
                      currentPage={currentPage}
                      from={from}
                      lastPage={lastPage}
                      perPage={perPage}
                      to={to}
                      total={total}
                      getPage={getPage}
                    />
                  </div>
                )}
              </div>

              <UserFormModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                initialData={user}
                isLoading={isUserLoading}
                onSubmitSuccess={handleFormSuccess}
              />
            </div>
          </>
      )}
    </>
  );
};


export default AdminUsersView;
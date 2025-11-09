/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@iconify/react";
interface UserTableProps {
  users: any[];
  onEdit?: (user: any) => void;
  onDelete?: (user: any) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

export const UserTable = ({ users, onEdit, onDelete, canEdit, canDelete }: UserTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 h-20">
          <tr>
            <th className="px-6 py-3 text-left text-lg font-medium   tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-lg font-medium   tracking-wider">Correo</th>
           
            <th className="px-6 py-3 text-left text-lg font-medium   tracking-wider">Celular</th>
            <th className="px-6 py-3 text-left text-lg font-medium   tracking-wider">Estatus</th>
            
            <th className="px-6 py-3 text-left text-lg font-medium   tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-6 py-6 text-center text-md text-gray-500">
                No hay usuarios registrados
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900">{`${user.name.first} ${user.name.last}`}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">{user.email}</td>
                
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">{user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.status === 'active' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-md font-medium">
                  <div className="flex space-x-2">
                    {canEdit && (
                      <button
                      onClick={() => onEdit?.(user)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Icon icon="mdi:pencil" width="14" height="14" />
                    </button>
                    )}
                    {canDelete && (
                      <button
                      onClick={() => onDelete?.(user?.id)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Icon icon="mdi:trash-can" width="14" height="14" />
                    </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@iconify/react";
interface UserTableProps {
  projects: any[];
  onEdit?: (project: any) => void;
  onDelete?: (project: any) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

export const ProjectsTable = ({ projects, onEdit, onDelete, canEdit, canDelete }: UserTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 h-20">
          <tr>
            <th className="px-6 py-3 text-left text-lg font-medium   tracking-wider">Titulo</th>
            <th className="px-6 py-3 text-left text-lg font-medium   tracking-wider">Descripción</th>
            <th className="px-6 py-3 text-left text-lg font-medium   tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-6 py-6 text-center text-md text-gray-500">
                No hay usuarios registrados
              </td>
            </tr>
          ) : (
            projects.map((project) => (
              <tr key={project.id}>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900">{project.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">{project.description}</td>
                
                
                
                <td className="px-6 py-4 whitespace-nowrap text-md font-medium">
                  <div className="flex space-x-2">
                    {canEdit && (
                      <button
                      onClick={() => onEdit?.(project)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Icon icon="mdi:pencil" width="14" height="14" />
                    </button>
                    )}
                    {canDelete && (
                      <button
                      onClick={() => onDelete?.(project?.id)}
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
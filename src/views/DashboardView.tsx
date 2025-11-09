import React from 'react';

interface DashboardViewProps {
  title: string;
}

const DashboardView: React.FC<DashboardViewProps> = ({ title }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold mb-4">{title}</h1>
      <p className="text-gray-600">
        Esta es una vista de ejemplo para {title}.
      </p>
    </div>
  );
};

export default DashboardView;

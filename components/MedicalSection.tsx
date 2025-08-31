'use client';

import React from 'react';

interface MedicalSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isEmpty?: boolean;
  emptyMessage?: string;
}

const MedicalSection: React.FC<MedicalSectionProps> = ({
  title,
  icon,
  children,
  isEmpty = false,
  emptyMessage = 'Aucune donnée disponible'
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>

      {isEmpty ? (
        <div className="text-center py-8">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default MedicalSection;
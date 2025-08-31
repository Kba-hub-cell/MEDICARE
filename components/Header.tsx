'use client';

import React from 'react';
import { usePatient } from '@/contexts/PatientContext';
import { User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const { patient } = usePatient();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">
          <div className="col-start-1"></div>
          <div className="col-start-2 flex justify-center">
            <ThemeToggle />
          </div>
          <div className="col-start-3 flex justify-end items-center space-x-5">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {patient ? `${patient.prenom} ${patient.nom}` : 'Chargement...'}
              </p>
              <p className="text-xs text-gray-500">Patient</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
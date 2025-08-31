'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Patient, getPatientData } from '@/lib/data';

interface PatientContextType {
  patient: Patient | null;
  loading: boolean;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
};

interface PatientProviderProps {
  children: React.ReactNode;
}

export const PatientProvider: React.FC<PatientProviderProps> = ({ children }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setPatient(getPatientData());
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PatientContext.Provider value={{ patient, loading }}>
      {children}
    </PatientContext.Provider>
  );
};
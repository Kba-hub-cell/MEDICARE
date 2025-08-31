'use client';

import React from 'react';
import { Calendar, Clock, MapPin, User, FileText, Stethoscope, Activity, Heart } from 'lucide-react';

interface RendezVous {
  id: string;
  date: string;
  heure: string;
  medecin: string;
  specialite: string;
  lieu: string;
  type: string;
  statut: string;
  motif: string;
  compteRendu?: string;
}

interface AppointmentCardProps {
  rendezvous: RendezVous;
  showDetails?: boolean;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ 
  rendezvous, 
  showDetails = false 
}) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusStyle = (statut: string) => {
    return statut === 'a_venir' 
      ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200 shadow-emerald-100'
      : 'bg-gradient-to-r from-gray-50 to-slate-50 text-gray-600 border-gray-200';
  };

  const getTypeStyle = (type: string) => {
    const styles = {
      consultation: 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-blue-200',
      examen: 'bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-purple-200',
      bilan: 'bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-orange-200',
      prevention: 'bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-teal-200',
    };
    return styles[type as keyof typeof styles] || 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'consultation': return <Stethoscope className="w-4 h-4" />;
      case 'examen': return <Activity className="w-4 h-4" />;
      case 'bilan': return <Heart className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  // Génération d'une image de profil basée sur le nom du médecin
  const getDoctorImage = (name: string) => {
    // Utilisation d'avatars réalistes avec des seed différents pour chaque médecin
    const seed = name.toLowerCase().replace(/[^a-z]/g, '');
    const gender = ['Dr. Marie', 'Dr. Sophie'].some(prefix => name.startsWith(prefix)) ? 'women' : 'men';
    const randomNum = Math.floor(Math.random() * 50) + 1;
    return `https://randomuser.me/api/portraits/${gender}/${randomNum}.jpg`;
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1">
      {/* Bande colorée en haut */}
      <div className={`h-2 ${rendezvous.statut === 'a_venir' ? 'bg-gradient-to-r from-emerald-400 to-teal-400' : 'bg-gradient-to-r from-gray-300 to-gray-400'}`} />
      
      <div className="p-6">
        {/* En-tête avec statut et type */}
        <div className="flex flex-wrap items-center justify-between mb-5 gap-3">
          <div className="flex items-center space-x-3">
            <span className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${getStatusStyle(rendezvous.statut)} shadow-sm`}>
              {rendezvous.statut === 'a_venir' ? '🟢 À venir' : '⏱️ Passé'}
            </span>
            <span className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${getTypeStyle(rendezvous.type)} shadow-md`}>
              {getTypeIcon(rendezvous.type)}
              {rendezvous.type.charAt(0).toUpperCase() + rendezvous.type.slice(1)}
            </span>
          </div>
        </div>

        {/* Informations principales */}
        <div className="space-y-4">
          {/* Médecin avec photo */}
          <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <div className="relative">
              <img 
                src={getDoctorImage(rendezvous.medecin)} 
                alt={rendezvous.medecin}
                className="w-14 h-14 rounded-full object-cover border-3 border-white shadow-md"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${rendezvous.medecin}&background=3B82F6&color=fff&size=56`;
                }}
              />
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                <Stethoscope className="w-3 h-3 text-blue-500" />
              </div>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">{rendezvous.medecin}</p>
              <p className="text-sm text-gray-600 font-medium">{rendezvous.specialite}</p>
            </div>
          </div>

          {/* Date et heure */}
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <Calendar className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{formatDate(rendezvous.date)}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="font-medium">{rendezvous.heure}</span>
              </div>
            </div>
          </div>

          {/* Lieu */}
          <div className="flex items-start space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
            <div className="bg-white p-2 rounded-lg shadow-sm mt-0.5">
              <MapPin className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">Lieu</p>
              <p className="text-sm text-gray-900 font-semibold">{rendezvous.lieu}</p>
            </div>
          </div>

          {/* Motif */}
          <div className="border-t-2 border-gray-100 pt-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
              <p className="text-sm font-bold text-purple-700 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Motif de consultation
              </p>
              <p className="text-gray-700 font-medium">{rendezvous.motif}</p>
            </div>
          </div>

          {/* Compte-rendu pour les RDV passés */}
          {showDetails && rendezvous.compteRendu && rendezvous.statut === 'passe' && (
            <div className="border-t-2 border-gray-100 pt-4">
              <div className="bg-gradient-to-br from-slate-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm">
                    <FileText className="w-4 h-4 text-gray-600" />
                  </div>
                  <p className="text-sm font-bold text-gray-800">Compte-rendu médical</p>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed bg-white p-3 rounded-lg">
                  {rendezvous.compteRendu}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
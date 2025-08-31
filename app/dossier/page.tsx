'use client';

import React from 'react';
import { getDossierMedical } from '@/lib/data';
import MedicalSection from '@/components/MedicalSection';
import { FileText, AlertTriangle, Pill, Shield, Calendar, MapPin, User, Activity } from 'lucide-react';

export default function DossierPage() {
  const dossier = getDossierMedical();

  const formatDate = (dateStr: string) => {
    if (dateStr === 'Antécédent familial') return dateStr;
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR');
  };

  const getSeverityColor = (severite: string) => {
    const colors = {
      'Légère': 'bg-green-100 text-green-800',
      'Modérée': 'bg-yellow-100 text-yellow-800',
      'Sévère': 'bg-red-100 text-red-800',
    };
    return colors[severite as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatutColor = (statut: string) => {
    const colors = {
      'En cours': 'bg-blue-100 text-blue-800',
      'Terminé': 'bg-gray-100 text-gray-800',
      'Contrôlée': 'bg-green-100 text-green-800',
      'Surveillance': 'bg-yellow-100 text-yellow-800',
    };
    return colors[statut as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* En-tête */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Dossier médical</h1>
        </div>
        <p className="text-lg text-gray-600">
          Consultez votre historique médical complet
        </p>
      </div>

      <div className="space-y-8">
        {/* Antécédents médicaux */}
        <MedicalSection
          title="Antécédents médicaux"
          icon={<Activity className="w-6 h-6 text-blue-600" />}
          isEmpty={dossier.antecedents.length === 0}
          emptyMessage="Aucun antécédent médical enregistré"
        >
          {dossier.antecedents.map((antecedent) => (
            <div key={antecedent.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {antecedent.type}
                  </span>
                  {antecedent.statut && (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatutColor(antecedent.statut)}`}>
                      {antecedent.statut}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(antecedent.date)}</span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{antecedent.description}</h3>
              {antecedent.etablissement && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{antecedent.etablissement}</span>
                </div>
              )}
            </div>
          ))}
        </MedicalSection>

        {/* Allergies */}
        <MedicalSection
          title="Allergies"
          icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
          isEmpty={dossier.allergies.length === 0}
          emptyMessage="Aucune allergie connue"
        >
          {dossier.allergies.map((allergie) => (
            <div key={allergie.id} className="border border-red-200 bg-red-50 rounded-lg p-4">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <h3 className="font-semibold text-red-900">{allergie.substance}</h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(allergie.severite)}`}>
                    {allergie.severite}
                  </span>
                  <div className="flex items-center space-x-1 text-sm text-red-600">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(allergie.dateDecouverte)}</span>
                  </div>
                </div>
              </div>
              <p className="text-red-800 font-medium">Réaction : {allergie.reaction}</p>
            </div>
          ))}
        </MedicalSection>

        {/* Traitements */}
        <MedicalSection
          title="Traitements"
          icon={<Pill className="w-6 h-6 text-green-600" />}
          isEmpty={dossier.traitements.length === 0}
          emptyMessage="Aucun traitement en cours"
        >
          {dossier.traitements.map((traitement) => (
            <div key={traitement.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900">{traitement.medicament}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatutColor(traitement.statut)}`}>
                    {traitement.statut}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <User className="w-4 h-4" />
                  <span>{traitement.medecin}</span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <p><span className="font-medium text-gray-700">Posologie :</span> {traitement.posologie}</p>
                <p><span className="font-medium text-gray-700">Indication :</span> {traitement.indication}</p>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <span>
                    <span className="font-medium">Début :</span> {formatDate(traitement.dateDebut)}
                  </span>
                  {traitement.dateFin && (
                    <span>
                      <span className="font-medium">Fin :</span> {formatDate(traitement.dateFin)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </MedicalSection>

        {/* Vaccinations */}
        <MedicalSection
          title="Vaccinations"
          icon={<Shield className="w-6 h-6 text-purple-600" />}
          isEmpty={dossier.vaccinations.length === 0}
          emptyMessage="Aucune vaccination enregistrée"
        >
          {dossier.vaccinations.map((vaccination) => (
            <div key={vaccination.id} className="border border-purple-200 bg-purple-50 rounded-lg p-4">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <h3 className="font-semibold text-purple-900">{vaccination.vaccin}</h3>
                <div className="flex items-center space-x-2 text-sm text-purple-600">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(vaccination.date)}</span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-purple-800">
                <div className="flex flex-wrap gap-4">
                  <span>
                    <span className="font-medium">Rappel prévu :</span> {formatDate(vaccination.rappel)}
                  </span>
                  <span>
                    <span className="font-medium">Lieu :</span> {vaccination.lieu}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </MedicalSection>
      </div>
    </div>
  );
}
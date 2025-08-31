'use client';

import React from 'react';
import { usePatient } from '@/contexts/PatientContext';
import { getDernierRendezVous, getProchainRendezVous, getRecommandationDuJour } from '@/lib/data';
import AppointmentCard from '@/components/AppointmentCard';
import HealthTipCard from '@/components/HealthTipCard';
import InfoCard from '@/components/InfoCard';
import { Calendar, Lightbulb, Heart, Clock } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { patient, loading } = usePatient();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const dernierRendezVous = getDernierRendezVous();
  const prochainRendezVous = getProchainRendezVous();
  const recommandationDuJour = getRecommandationDuJour();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* En-tête de bienvenue */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bonjour {patient?.prenom} ! 
        </h1>
        <p className="text-lg text-gray-600">
          Voici un aperçu de votre suivi médical
        </p>
      </div>

      {/* Cartes de résumé */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <InfoCard
          title="Prochain rendez-vous"
          value={prochainRendezVous ? prochainRendezVous.medecin : 'Aucun RDV prévu'}
          subtitle={prochainRendezVous ? 
            `${new Date(prochainRendezVous.date).toLocaleDateString('fr-FR')} à ${prochainRendezVous.heure}` : 
            'Prenez rendez-vous avec votre médecin'
          }
          icon={<Calendar className="w-6 h-6" />}
          color="blue"
        />
        
        <InfoCard
          title="Médecin traitant"
          value={patient?.medecinTraitant.nom || 'Non défini'}
          subtitle={patient?.medecinTraitant.specialite}
          icon={<Heart className="w-6 h-6" />}
          color="green"
        />

        <InfoCard
          title="Suivi actif"
          value="2 traitements"
          subtitle="En cours de traitement"
          icon={<Clock className="w-6 h-6" />}
          color="orange"
        />
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Dernier rendez-vous */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Dernier rendez-vous</h2>
            <Link 
              href="/rendez-vous"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors duration-200"
            >
              Voir tous les rendez-vous →
            </Link>
          </div>
          
          {dernierRendezVous ? (
            <AppointmentCard rendezvous={dernierRendezVous} showDetails={true} />
          ) : (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun rendez-vous récent</p>
            </div>
          )}
        </div>

        {/* Recommandation du jour */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Conseil du jour</h2>
            <Link 
              href="/recommandations"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors duration-200"
            >
              Toutes les recommandations →
            </Link>
          </div>
          
          {recommandationDuJour ? (
            <HealthTipCard recommandation={recommandationDuJour} compact={true} />
          ) : (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
              <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucune recommandation disponible</p>
            </div>
          )}

          {/* Actions rapides */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
            <div className="space-y-3">
              <Link 
                href="/dossier"
                className="flex items-center justify-between p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="text-gray-700">Consulter mon dossier médical</span>
                <span className="text-blue-600">→</span>
              </Link>
              <Link 
                href="/rendez-vous"
                className="flex items-center justify-between p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="text-gray-700">Gérer mes rendez-vous</span>
                <span className="text-blue-600">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
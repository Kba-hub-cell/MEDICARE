'use client';

import React, { useState, useMemo } from 'react';
import { getRendezVous, RendezVous } from '@/lib/data';
import AppointmentCard from '@/components/AppointmentCard';
import FilterTabs from '@/components/FilterTabs';
import PageTransition from '@/components/PageTransition';
import { Calendar, Search } from 'lucide-react';

export default function RendezVousPage() {
  const [activeFilter, setActiveFilter] = useState('tous');
  const [searchTerm, setSearchTerm] = useState('');
  
  const allRendezVous = getRendezVous();

  const filteredRendezVous = useMemo(() => {
    let filtered = allRendezVous;

    // Filtre par statut
    if (activeFilter === 'a_venir') {
      filtered = filtered.filter(rdv => rdv.statut === 'a_venir');
    } else if (activeFilter === 'passes') {
      filtered = filtered.filter(rdv => rdv.statut === 'passe');
    }

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(rdv =>
        rdv.medecin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rdv.specialite.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rdv.motif.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tri par date (plus récents en premier pour les passés, plus proches en premier pour les à venir)
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      
      if (activeFilter === 'passes') {
        return dateB - dateA; // Plus récent en premier
      } else {
        return dateA - dateB; // Plus proche en premier
      }
    });
  }, [allRendezVous, activeFilter, searchTerm]);

  const tabs = [
    { 
      id: 'tous', 
      label: 'Tous', 
      count: allRendezVous.length 
    },
    { 
      id: 'a_venir', 
      label: 'À venir', 
      count: allRendezVous.filter(rdv => rdv.statut === 'a_venir').length 
    },
    { 
      id: 'passes', 
      label: 'Passés', 
      count: allRendezVous.filter(rdv => rdv.statut === 'passe').length 
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* En-tête */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Mes rendez-vous</h1>
        </div>
        <p className="text-lg text-gray-600">
          Consultez et gérez vos rendez-vous médicaux
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par médecin, spécialité ou motif..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filtres */}
      <FilterTabs
        tabs={tabs}
        activeTab={activeFilter}
        onTabChange={setActiveFilter}
      />

      {/* Liste des rendez-vous */}
      {filteredRendezVous.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRendezVous.map((rdv) => (
            <AppointmentCard
              key={rdv.id}
              rendezvous={rdv}
              showDetails={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun rendez-vous trouvé
          </h3>
          <p className="text-gray-500">
            {searchTerm ? 
              'Essayez de modifier votre recherche' : 
              'Aucun rendez-vous correspondant au filtre sélectionné'
            }
          </p>
        </div>
      )}
    </div>
  );
}
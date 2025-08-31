'use client';

import React, { useState, useMemo } from 'react';
import { getRecommandations, getCategoriesRecommandations } from '@/lib/data';
import HealthTipCard from '@/components/HealthTipCard';
import FilterTabs from '@/components/FilterTabs';
import { Lightbulb, Search } from 'lucide-react';

export default function RecommandationsPage() {
  const [activeCategory, setActiveCategory] = useState('toutes');
  const [searchTerm, setSearchTerm] = useState('');
  
  const allRecommandations = getRecommandations();
  const categories = getCategoriesRecommandations();

  const filteredRecommandations = useMemo(() => {
    let filtered = allRecommandations;

    // Filtre par catégorie
    if (activeCategory !== 'toutes') {
      filtered = filtered.filter(rec => rec.categorie === activeCategory);
    }

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(rec =>
        rec.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.source.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tri par priorité puis par date
    return filtered.sort((a, b) => {
      const priorityOrder = { 'Élevée': 3, 'Moyenne': 2, 'Faible': 1 };
      const priorityA = priorityOrder[a.priorite as keyof typeof priorityOrder];
      const priorityB = priorityOrder[b.priorite as keyof typeof priorityOrder];
      
      if (priorityA !== priorityB) {
        return priorityB - priorityA; // Priorité élevée en premier
      }
      
      // Si même priorité, tri par date (plus récent en premier)
      return new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime();
    });
  }, [allRecommandations, activeCategory, searchTerm]);

  const tabs = [
    { 
      id: 'toutes', 
      label: 'Toutes', 
      count: allRecommandations.length 
    },
    ...categories.map(category => ({
      id: category,
      label: category,
      count: allRecommandations.filter(rec => rec.categorie === category).length
    }))
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* En-tête */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Lightbulb className="w-8 h-8 text-orange-600" />
          <h1 className="text-3xl font-bold text-gray-900">Recommandations santé</h1>
        </div>
        <p className="text-lg text-gray-600">
          Conseils personnalisés pour améliorer votre santé au quotidien
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher dans les recommandations..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filtres par catégorie */}
      <FilterTabs
        tabs={tabs}
        activeTab={activeCategory}
        onTabChange={setActiveCategory}
      />

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium text-red-800">
              {allRecommandations.filter(r => r.priorite === 'Élevée').length} recommandations prioritaires
            </span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm font-medium text-yellow-800">
              {allRecommandations.filter(r => r.priorite === 'Moyenne').length} recommandations modérées
            </span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-800">
              {allRecommandations.filter(r => r.priorite === 'Faible').length} conseils généraux
            </span>
          </div>
        </div>
      </div>

      {/* Liste des recommandations */}
      {filteredRecommandations.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRecommandations.map((recommandation) => (
            <HealthTipCard
              key={recommandation.id}
              recommandation={recommandation}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucune recommandation trouvée
          </h3>
          <p className="text-gray-500">
            {searchTerm ? 
              'Essayez de modifier votre recherche' : 
              'Aucune recommandation dans cette catégorie'
            }
          </p>
        </div>
      )}
    </div>
  );
}
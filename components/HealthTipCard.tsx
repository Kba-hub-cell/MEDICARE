'use client';

import React from 'react';
import { Recommandation } from '@/lib/data';
import { Lightbulb, User, Calendar } from 'lucide-react';

interface HealthTipCardProps {
  recommandation: Recommandation;
  compact?: boolean;
}

const HealthTipCard: React.FC<HealthTipCardProps> = ({ 
  recommandation, 
  compact = false 
}) => {
  const getPriorityColor = (priorite: string) => {
    const colors = {
      'Élevée': 'bg-red-100 text-red-800 border-red-200',
      'Moyenne': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Faible': 'bg-green-100 text-green-800 border-green-200',
    };
    return colors[priorite as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getCategoryColor = (categorie: string) => {
    const colors = {
      'Nutrition': 'bg-orange-100 text-orange-800',
      'Activité physique': 'bg-blue-100 text-blue-800',
      'Sommeil': 'bg-purple-100 text-purple-800',
      'Bien-être': 'bg-teal-100 text-teal-800',
    };
    return colors[categorie as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR');
  };

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900">{recommandation.titre}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(recommandation.categorie)}`}>
                {recommandation.categorie}
              </span>
            </div>
            <p className="text-sm text-gray-700">{recommandation.description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      {/* En-tête avec badges */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(recommandation.categorie)}`}>
            {recommandation.categorie}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(recommandation.priorite)}`}>
            Priorité {recommandation.priorite.toLowerCase()}
          </span>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <Lightbulb className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">{recommandation.titre}</h3>
            <p className="text-gray-700 leading-relaxed">{recommandation.description}</p>
          </div>
        </div>

        {/* Métadonnées */}
        <div className="border-t pt-3 flex flex-wrap items-center justify-between text-sm text-gray-500 gap-2">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>{recommandation.source}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(recommandation.dateCreation)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTipCard;
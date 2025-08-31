'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Heart, 
  Calendar, 
  FileText, 
  Lightbulb, 
  HelpCircle, 
  MessageCircle,
  ChevronRight,
  Home,
  Phone,
  Mail,
  BookOpen,
  Headphones,
  Activity
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const navigation = [
   /* { name: 'Accueil', href: '/', icon: Home, color: 'from-cyan-400 to-blue-400' },*/
    { name: 'Rendez-vous', href: '/rendez-vous', icon: Calendar, color: 'from-purple-400 to-pink-400' },
    { name: 'Dossier médical', href: '/dossier', icon: FileText, color: 'from-green-400 to-emerald-400' },
    { name: 'Recommandations', href: '/recommandations', icon: Lightbulb, color: 'from-yellow-400 to-orange-400' },
  ];

  const helpItems = [
    { name: 'FAQ', icon: BookOpen, action: 'faq' },
    { name: 'Contacter Support', icon: Headphones, action: 'contact' },
    { name: 'Email', icon: Mail, action: 'email' },
    { name: 'Téléphone', icon: Phone, action: 'phone' },
  ];

  const handleHelpAction = (action: string) => {
    switch(action) {
      case 'faq':
        console.log('Ouvrir FAQ');
        break;
      case 'contact':
        console.log('Ouvrir support chat');
        break;
      case 'email':
        window.location.href = 'mailto:support@medicare.ma';
        break;
      case 'phone':
        window.location.href = 'tel:+212522123456';
        break;
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-[#15587d] to-[#0d3a52] shadow-2xl overflow-hidden">
      {/* Motif décoratif en arrière-plan */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-20 translate-y-20" />
      </div>

      {/* Logo et titre avec animation */}
      <div className="relative p-6 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-70" />
            <div className="relative flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-xl transform group-hover:scale-110 transition-transform duration-300">
              <img                  
  src="/logo_medicare.png"                  
  alt="logo"                 
               
/>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              MediCare
              <span className="text-xs bg-gradient-to-r from-cyan-400 to-blue-400 text-white px-2 py-1 rounded-full font-semibold">
                PRO
              </span>
            </h1>
            <p className="text-sm text-cyan-200 font-medium">Portail Patient</p>
          </div>
        </div>

        {/* Carte patient stylisée */}
        <div className="mt-4 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-2 text-white/90">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-xs">Statut: Actif</span>
          </div>
        </div>
      </div>

      {/* Navigation avec icônes colorées */}
      <nav className="p-4 space-y-2">
        {navigation.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group relative flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-white/20 backdrop-blur-sm shadow-lg'
                  : 'hover:bg-white/10'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Indicateur actif */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-r-full" />
              )}
              
              {/* Icône avec gradient */}
              <div className={`relative ${isActive ? 'transform scale-110' : 'group-hover:scale-110'} transition-transform duration-300`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-lg blur-md opacity-50 ${isActive ? 'opacity-70' : 'group-hover:opacity-70'}`} />
                <div className="relative bg-white/90 p-2 rounded-lg shadow-md">
                  <Icon className={`w-5 h-5 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`} 
                        style={{ filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.2))' }} />
                </div>
              </div>
              
              
              <span className={`font-semibold ${isActive ? 'text-white' : 'text-white/80 group-hover:text-white'} transition-colors duration-300`}>
                {item.name}
              </span>
              
              {/* Flèche animée */}
              <ChevronRight className={`w-4 h-4 ml-auto text-white/50 transform transition-all duration-300 ${
                isActive ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
              }`} />
            </Link>
          );
        })}
      </nav>

      {/* Section Aide et Support */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0d3a52] to-transparent">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <button
            onClick={() => setIsHelpOpen(!isHelpOpen)}
            className="w-full flex items-center justify-between text-white hover:bg-white/10 rounded-xl p-3 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-amber-400 to-orange-400 p-2 rounded-lg shadow-lg">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold">Aide & Support</span>
            </div>
            <ChevronRight className={`w-5 h-5 transform transition-transform duration-300 ${isHelpOpen ? 'rotate-90' : ''}`} />
          </button>
          
          {/* Menu déroulant d'aide */}
          <div className={`grid grid-cols-2 gap-2 mt-3 overflow-hidden transition-all duration-300 ${
            isHelpOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            {helpItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => handleHelpAction(item.action)}
                  className="group flex flex-col items-center gap-2 p-3 bg-white/5 hover:bg-white/15 rounded-xl transition-all duration-300"
                >
                  <div className="bg-white/10 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-4 h-4 text-cyan-300" />
                  </div>
                  <span className="text-xs text-white/80 font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Informations de contact rapide */}
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <MessageCircle className="w-4 h-4 text-green-400 mx-auto mb-1" />
                <p className="text-xs text-white/60">Chat 24/7</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <Phone className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                <p className="text-xs text-white/60">0522-123456</p>
              </div>
            </div>
          </div>
        </div>

        {/* Badge de version */}
        <div className="mt-3 text-center">
          <span className="text-xs text-white/40">Version 2.0.1</span>
        </div>
      </div>

      {/* Effet de lumière animé */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-20 w-40 h-40 bg-cyan-400 rounded-full blur-3xl opacity-20 animate-pulse" />
    </aside>
  );
};

export default Sidebar;
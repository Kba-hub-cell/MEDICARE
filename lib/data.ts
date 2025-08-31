import patientData from '@/data/patient.json';
import rendezvousData from '@/data/rendezvous.json';
import dossierData from '@/data/dossier.json';
import recommandationsData from '@/data/recommandations.json';

export interface Patient {
  id: string;
  prenom: string;
  nom: string;
  dateNaissance: string;
  numeroSecu: string;
  email: string;
  telephone: string;
  medecinTraitant: {
    nom: string;
    specialite: string;
    telephone: string;
  };
}

export interface RendezVous {
  id: string;
  medecin: string;
  specialite: string;
  date: string;
  heure: string;
  lieu: string;
  statut: 'a_venir' | 'passe';
  motif: string;
  type: string;
  compteRendu?: string;
}

export interface Antecedent {
  id: string;
  type: string;
  description: string;
  date: string;
  etablissement?: string;
  statut?: string;
}

export interface Allergie {
  id: string;
  substance: string;
  reaction: string;
  severite: string;
  dateDecouverte: string;
}

export interface Traitement {
  id: string;
  medicament: string;
  posologie: string;
  indication: string;
  dateDebut: string;
  dateFin: string | null;
  medecin: string;
  statut: string;
}

export interface Vaccination {
  id: string;
  vaccin: string;
  date: string;
  rappel: string;
  lieu: string;
}

export interface Recommandation {
  id: string;
  titre: string;
  description: string;
  categorie: string;
  priorite: string;
  dateCreation: string;
  source: string;
}

export interface DossierMedical {
  antecedents: Antecedent[];
  allergies: Allergie[];
  traitements: Traitement[];
  vaccinations: Vaccination[];
}

// Fonctions utilitaires pour récupérer les données
export const getPatientData = (): Patient => patientData;

export const getRendezVous = (): RendezVous[] => rendezvousData.rendezvous;

export const getDossierMedical = (): DossierMedical => dossierData;

export const getRecommandations = (): Recommandation[] => recommandationsData.recommandations;

// Fonctions pour filtrer les données
export const getRendezVousAVenir = (): RendezVous[] => {
  const today = new Date().toISOString().split('T')[0];
  return getRendezVous().filter(rdv => rdv.date >= today && rdv.statut === 'a_venir');
};

export const getRendezVousPasses = (): RendezVous[] => {
  const today = new Date().toISOString().split('T')[0];
  return getRendezVous().filter(rdv => rdv.date < today || rdv.statut === 'passe');
};

export const getDernierRendezVous = (): RendezVous | null => {
  const rdvPasses = getRendezVousPasses();
  if (rdvPasses.length === 0) return null;
  
  return rdvPasses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
};

export const getProchainRendezVous = (): RendezVous | null => {
  const rdvAVenir = getRendezVousAVenir();
  if (rdvAVenir.length === 0) return null;
  
  return rdvAVenir.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
};

export const getRecommandationDuJour = (): Recommandation | null => {
  const recommandations = getRecommandations();
  if (recommandations.length === 0) return null;
  
  // Retourne une recommandation aléatoire basée sur la date du jour
  const today = new Date().getDate();
  const index = today % recommandations.length;
  return recommandations[index];
};

export const getRecommandationsParCategorie = (categorie: string): Recommandation[] => {
  return getRecommandations().filter(rec => rec.categorie === categorie);
};

export const getCategoriesRecommandations = (): string[] => {
  const recommandations = getRecommandations();
  const categories = [...new Set(recommandations.map(rec => rec.categorie))];
  return categories.sort();
};
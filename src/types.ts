export type EtapeType = "Manuscrit en cours d'écriture" | "Pré-lancement" | "Livre sorti";

export interface GeneratedIdea {
  originalIdee: string;
  idee: string;
  accroche: string;
  structure: string[];
  pourquoi_ca_marche: string;
}

export interface GenerationParams {
  etape: EtapeType;
  titreLivre: string;
  personnages: string;
  tropes: string[];
  ton: string;
}

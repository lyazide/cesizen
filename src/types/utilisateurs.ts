type Utilisateur = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  isActif: boolean;
  isAdministrateur: boolean;
  Realise: Realise[];
  Soumet: Soumet[];
  Effectue: Effectue[];
  Enregistre: Enregistre[];
  Consulte: Consulte[];
};

export default Utilisateur;

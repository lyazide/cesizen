// Importation des dépendances nécessaires
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const diagnosticsData = [
  { evenement: 'Mort du conjoint', points: 100 },
  { evenement: 'Divorce', points: 73 },
  { evenement: 'Séparation des époux', points: 65 },
  { evenement: 'Mort d’un parent proche', points: 63 },
  { evenement: 'Période de prison', points: 63 },
  { evenement: 'Blessure corporelle ou maladie', points: 53 },
  { evenement: 'Mariage', points: 50 },
  { evenement: 'Licenciement', points: 47 },
  { evenement: 'Réconciliation entre époux', points: 45 },
  { evenement: 'Départ à la retraite', points: 45 },
  { evenement: 'Changement dans la santé d’un membre de la famille', points: 44 },
  { evenement: 'Grossesse', points: 40 },
  { evenement: 'Difficultés sexuelles', points: 39 },
  { evenement: 'Arrivée d’un nouveau membre dans la famille', points: 39 },
  { evenement: 'Changement dans l’univers du travail', points: 39 },
  { evenement: 'Changement au niveau financier', points: 38 },
  { evenement: 'Mort d’un ami proche', points: 37 },
  { evenement: 'Changement de fonction professionnelle', points: 36 },
  { evenement: 'Modification de la fréquence des scènes de ménage', points: 35 },
  { evenement: 'Hypothèque ou emprunt de plus de 3.000 €', points: 31 },
  { evenement: 'Saisie sur hypothèque ou sur prêt', points: 30 },
  { evenement: 'Changement de responsabilité dans le travail', points: 29 },
  { evenement: 'Départ du foyer d’une fille ou d’un fils', points: 29 },
  { evenement: 'Difficultés avec les beaux-parents', points: 29 },
  { evenement: 'Succès exceptionnel', points: 28 },
  { evenement: 'Conjoint commençant ou cessant de travailler', points: 26 },
  { evenement: 'Début ou fin des études', points: 26 },
  { evenement: 'Changement dans les conditions de vie', points: 25 },
  { evenement: 'Changement d’habitudes', points: 24 },
  { evenement: 'Difficultés avec son employeur/son manager', points: 23 },
  { evenement: 'Changement d’horaires ou de conditions de travail', points: 20 },
  { evenement: 'Changement de domicile', points: 20 },
  { evenement: 'Changement de lieu d’étude', points: 20 },
  { evenement: 'Changement dans les loisirs', points: 19 },
  { evenement: 'Changement dans les activités de la paroisse', points: 19 },
  { evenement: 'Changement dans les activités sociales', points: 19 },
  { evenement: 'Hypothèque ou emprunt de moins de 3.000€', points: 17 },
  { evenement: 'Changement dans les habitudes de sommeil', points: 16 },
  { evenement: 'Changement du nombre de réunions de famille', points: 15 },
  { evenement: 'Changement dans les habitudes alimentaires', points: 15 },
  { evenement: 'Vacances', points: 13 },
  { evenement: 'Noël', points: 12 },
  { evenement: 'Infractions mineures à la loi, contraventions', points: 11 },
];

async function populateDiagnostics() {
  const count = await prisma.diagnostic.count();

  if (count === 0) {
    console.log('La table Diagnostic est vide. Ajout des données...');
    await prisma.diagnostic.createMany({
      data: diagnosticsData,
    });
    console.log('Données ajoutées avec succès.');
  } else {
    console.log('La table Diagnostic contient déjà des données.');
  }
}

populateDiagnostics()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
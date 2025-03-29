// Importation des dépendances nécessaires
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const respirationsData = [
  {
    nom: '755',
    description: 'Exercice pour se détendre',
    inspiration: 7,
    apnee: 5,
    expiration: 5,
  },
  {
    nom: '55',
    description: 'Exercice pour réduire le stress',
    inspiration: 5,
    apnee: 0,
    expiration: 5,
  },
  {
    nom: '46',
    description: 'Exercice pour se concentrer',
    inspiration: 4,
    apnee: 0,
    expiration: 6,
  },
];

async function populateRespirations() {
  const count = await prisma.respiration.count();

  if (count === 0) {
    console.log('La table Respiration est vide. Ajout des données...');
    await prisma.respiration.createMany({
      data: respirationsData,
    });
    console.log('Données ajoutées avec succès.');
  } else {
    console.log('La table Respiration contient déjà des données.');
  }
}

populateRespirations()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
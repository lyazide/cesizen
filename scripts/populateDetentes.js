// Importation des dépendances nécessaires
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



const detentesData = [
  { nom: 'Titre du post', description: 'Description du post', duree: 10, imagePath: '/assets/ScanCorporel.jpg' },

];

async function populateDetentes() {
  const count = await prisma.detente.count();

  if (count === 0) {
    console.log('La table Diagnostic est vide. Ajout des données...');
    await prisma.detente.createMany({
      data: detentesData,
    });
    console.log('Données ajoutées avec succès.');
  } else {
    console.log('La table Diagnostic contient déjà des données.');
  }
}

populateDetentes()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
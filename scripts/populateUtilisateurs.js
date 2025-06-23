import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const utilisateursData = [
  {
    nom: 'Lyazide',
    prenom: 'Oudjoudi',
    email: 'lyazide@hotmail.com',
    motDePasse: 'password123',
    isActif: true,
    isAdministrateur: false,
  },
  {
    nom: 'Yaz',
    prenom: 'Oud',
    email: 'lyazide11@hotmail.com',
    motDePasse: 'password123',
    isActif: true,
    isAdministrateur: true,
  },
];

async function populateUtilisateurs() {
  const count = await prisma.utilisateur.count();

  if (count === 0) {
    console.log('La table Utilisateur est vide. Ajout des utilisateurs...');

    const utilisateursHashed = await Promise.all(
      utilisateursData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.motDePasse, 10);
        return { ...user, motDePasse: hashedPassword };
      })
    );

    await prisma.utilisateur.createMany({
      data: utilisateursHashed,
    });

    console.log('Utilisateurs insérés avec succès.');
  } else {
    console.log('La table Utilisateur contient déjà des données.');
  }
}

populateUtilisateurs()
  .catch((e) => {
    console.error('Erreur lors du peuplement :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// Importation des dépendances nécessaires
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const emotionsData = [
  { emotion: 'Inquiétude', emotionBase: 'Peur' },
  { emotion: 'Anxiété', emotionBase: 'Peur' },
  { emotion: 'Terreur', emotionBase: 'Peur' },
  { emotion: 'Appréhension', emotionBase: 'Peur' },
  { emotion: 'Panique', emotionBase: 'Peur' },
  { emotion: 'Crainte', emotionBase: 'Peur' },
  { emotion: 'Chagrin', emotionBase: 'Tristesse' },
  { emotion: 'Mélancolie', emotionBase: 'Tristesse' },
  { emotion: 'Abattement', emotionBase: 'Tristesse' },
  { emotion: 'Désespoir', emotionBase: 'Tristesse' },
  { emotion: 'Solitude', emotionBase: 'Tristesse' },
  { emotion: 'Dépression', emotionBase: 'Tristesse' },
  { emotion: 'Étonnement', emotionBase: 'Surprise' },
  { emotion: 'Stupéfaction', emotionBase: 'Surprise' },
  { emotion: 'Sidération', emotionBase: 'Surprise' },
  { emotion: 'Incrédule', emotionBase: 'Surprise' },
  { emotion: 'Émerveillement', emotionBase: 'Surprise' },
  { emotion: 'Confusion', emotionBase: 'Surprise' },
  { emotion: 'Répulsion', emotionBase: 'Dégoût' },
  { emotion: 'Déplaisir', emotionBase: 'Dégoût' },
  { emotion: 'Nausée', emotionBase: 'Dégoût' },
  { emotion: 'Dédain', emotionBase: 'Dégoût' },
  { emotion: 'Horreur', emotionBase: 'Dégoût' },
  { emotion: 'Dégoût profond', emotionBase: 'Dégoût' },
];

async function populateEmotions() {
  const count = await prisma.emotion.count();

  if (count === 0) {
    console.log('La table Emotion est vide. Ajout des données...');
    await prisma.emotion.createMany({
      data: emotionsData,
    });
    console.log('Données ajoutées avec succès.');
  } else {
    console.log('La table Emotion contient déjà des données.');
  }
}

populateEmotions()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
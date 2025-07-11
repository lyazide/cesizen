-- AlterTable
ALTER TABLE "Detente" ALTER COLUMN "nom" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Diagnostic" ALTER COLUMN "evenement" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Emotion"
ALTER COLUMN "emotion"
SET
    DATA TYPE TEXT,
ALTER COLUMN "emotionBase"
SET
    DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Enregistre"
ALTER COLUMN "commentaire"
SET
    DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Information" ALTER COLUMN "titre" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Respiration"
ALTER COLUMN "nom"
SET
    DATA TYPE TEXT,
ALTER COLUMN "description"
SET
    DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Utilisateur"
ALTER COLUMN "nom"
SET
    DATA TYPE TEXT,
ALTER COLUMN "prenom"
SET
    DATA TYPE TEXT,
ALTER COLUMN "email"
SET
    DATA TYPE TEXT,
ALTER COLUMN "motDePasse"
SET
    DATA TYPE TEXT;
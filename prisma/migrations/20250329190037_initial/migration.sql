-- CreateTable
CREATE TABLE "Detente" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "duree" INTEGER NOT NULL,

    CONSTRAINT "Detente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(50) NOT NULL,
    "prenom" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "motDePasse" VARCHAR(50) NOT NULL,
    "isActif" BOOLEAN NOT NULL,
    "isAdministrateur" BOOLEAN NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Emotion" (
    "id" SERIAL NOT NULL,
    "emotion" VARCHAR(50),
    "emotionBase" VARCHAR(50),

    CONSTRAINT "Emotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Respiration" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(50) NOT NULL,
    "description" VARCHAR(50),
    "inspiration" INTEGER NOT NULL,
    "apnee" INTEGER NOT NULL,
    "expiration" INTEGER,

    CONSTRAINT "Respiration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Information" (
    "id" SERIAL NOT NULL,
    "titre" VARCHAR(50),
    "contenu" TEXT,
    "dateCreation" TIMESTAMP NOT NULL,
    "dateModification" TIMESTAMP NOT NULL,

    CONSTRAINT "Information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diagnostic" (
    "id" SERIAL NOT NULL,
    "evenement" VARCHAR(50) NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "Diagnostic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Realise" (
    "id_Detente" INTEGER NOT NULL,
    "id_Utilisateur" INTEGER NOT NULL,
    "date_" TIMESTAMP NOT NULL,
    "favoris" BOOLEAN NOT NULL,

    CONSTRAINT "Realise_pkey" PRIMARY KEY ("id_Detente","id_Utilisateur")
);

-- CreateTable
CREATE TABLE "Soumet" (
    "id_Utilisateur" INTEGER NOT NULL,
    "id_Diagnostic" INTEGER NOT NULL,
    "date_" TIMESTAMP NOT NULL,

    CONSTRAINT "Soumet_pkey" PRIMARY KEY ("id_Utilisateur","id_Diagnostic")
);

-- CreateTable
CREATE TABLE "Effectue" (
    "id_Utilisateur" INTEGER NOT NULL,
    "id_Respiration" INTEGER NOT NULL,
    "date_" TIMESTAMP NOT NULL,
    "duree" INTEGER NOT NULL,

    CONSTRAINT "Effectue_pkey" PRIMARY KEY ("id_Utilisateur","id_Respiration")
);

-- CreateTable
CREATE TABLE "Enregistre" (
    "id_Utilisateur" INTEGER NOT NULL,
    "id_Emotion" INTEGER NOT NULL,
    "date_" TIMESTAMP NOT NULL,
    "commentaire" VARCHAR(50),

    CONSTRAINT "Enregistre_pkey" PRIMARY KEY ("id_Utilisateur","id_Emotion")
);

-- CreateTable
CREATE TABLE "Consulte" (
    "id_Utilisateur" INTEGER NOT NULL,
    "id_Information" INTEGER NOT NULL,

    CONSTRAINT "Consulte_pkey" PRIMARY KEY ("id_Utilisateur","id_Information")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- AddForeignKey
ALTER TABLE "Realise" ADD CONSTRAINT "Realise_id_Detente_fkey" FOREIGN KEY ("id_Detente") REFERENCES "Detente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Realise" ADD CONSTRAINT "Realise_id_Utilisateur_fkey" FOREIGN KEY ("id_Utilisateur") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Soumet" ADD CONSTRAINT "Soumet_id_Utilisateur_fkey" FOREIGN KEY ("id_Utilisateur") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Soumet" ADD CONSTRAINT "Soumet_id_Diagnostic_fkey" FOREIGN KEY ("id_Diagnostic") REFERENCES "Diagnostic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Effectue" ADD CONSTRAINT "Effectue_id_Utilisateur_fkey" FOREIGN KEY ("id_Utilisateur") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Effectue" ADD CONSTRAINT "Effectue_id_Respiration_fkey" FOREIGN KEY ("id_Respiration") REFERENCES "Respiration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enregistre" ADD CONSTRAINT "Enregistre_id_Utilisateur_fkey" FOREIGN KEY ("id_Utilisateur") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enregistre" ADD CONSTRAINT "Enregistre_id_Emotion_fkey" FOREIGN KEY ("id_Emotion") REFERENCES "Emotion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consulte" ADD CONSTRAINT "Consulte_id_Utilisateur_fkey" FOREIGN KEY ("id_Utilisateur") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consulte" ADD CONSTRAINT "Consulte_id_Information_fkey" FOREIGN KEY ("id_Information") REFERENCES "Information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

import { createMocks } from "node-mocks-http";
import { GET, POST, PUT, DELETE } from "../users/route";
import prisma from "@/utils/db";
import Utilisateur from "../../../types/utilisateurs";

// ✅ Mock de NextResponse pour éviter l'erreur "Request is not defined"
/*jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      status: options?.status || 200,
      body: data,
    })),
  },
}));*/
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, options) => {
      return new Response(JSON.stringify(data), {
        status: options?.status || 200,
        headers: { "Content-Type": "application/json" },
      });
    }),
  },
}));

// ✅ Mock de Prisma
jest.mock("@/utils/db", () => ({
  __esModule: true,
  default: {
    utilisateur: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Utilisateurs API", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Réinitialise les mocks avant chaque test
  });

  it("devrait renvoyer une liste de utilisateurs avec GET", async () => {
    const utilisateursData: Utilisateur[] = [
      {
        id: 1,
        email: "lyazide@hotmail.com",
        nom: "Oudjoudi",
        prenom: "Lyazide",
        motDePasse: "password123",
        isActif: true,
        isAdministrateur: false,
      },
      {
        id: 2,
        email: "yaz@altern.org",
        nom: "Oud",
        prenom: "Yaz",
        motDePasse: "password456",
        isActif: true,
        isAdministrateur: true,
      },
    ];

    // ✅ Mock de la réponse de Prisma
    (prisma.utilisateur.findMany as jest.Mock).mockResolvedValue(
      utilisateursData
    );

    // ✅ Création de mocks pour req et res
    //const { req } = createMocks();

    // ✅ Simulation de la fonction GET
    const response = await GET();
    const bodyResponse = await response.json();

    // ✅ Assertions sur la réponse

    expect(response?.status ?? 500).toBe(200);

    expect(bodyResponse!.data.length).toBe(2);
    expect(bodyResponse!.data[0].email).toBe("lyazide@hotmail.com");
    expect(bodyResponse!.data[1].email).toBe("yaz@altern.org");
    expect(bodyResponse!.data[0].nom).toBe("Oudjoudi");
    expect(bodyResponse!.data[1].nom).toBe("Oud");
    expect(bodyResponse!.data[0].prenom).toBe("Lyazide");
    expect(bodyResponse!.data[1].prenom).toBe("Yaz");
    expect(bodyResponse!.data[0].motDePasse).toBe("password123");
    expect(bodyResponse!.data[1].motDePasse).toBe("password456");
    expect(bodyResponse!.data[0].isActif).toBe(true);
    expect(bodyResponse!.data[1].isActif).toBe(true);
    expect(bodyResponse!.data[0].isAdministrateur).toBe(false);
    expect(bodyResponse!.data[1].isAdministrateur).toBe(true);
  });

  it("devrait renvoyer une erreur si aucun utilisateur n'est trouvé avec GET", async () => {
    // ✅ Mock de Prisma renvoyant une liste vide
    (prisma.utilisateur.findMany as jest.Mock).mockResolvedValue([]);

    // ✅ Création de mocks pour req et res
    //const { req } = createMocks();

    // ✅ Simulation de la fonction GET
    const response = await GET();
    const bodyResponse = await response.json();
    // ✅ Assertions sur la réponse
    expect(response.status).toBe(404);
    expect(bodyResponse!.error).toBe("No utilisateurs found.");
  });

  it("devrait créer un nouveau utilisateur avec POST", async () => {
    const newDiagnostic: Utilisateur = {
      id: 3,
      email: "test@essai.org",
      nom: "Test",
      prenom: "Essai",
      motDePasse: "passwordtest",
      isActif: true,
      isAdministrateur: true,
    };

    // ✅ Mock de la création de utilisateur dans Prisma
    (prisma.utilisateur.create as jest.Mock).mockResolvedValue(newDiagnostic);

    // ✅ Création de mocks pour req et res
    const { req } = createMocks({
      method: "POST",
      body: {
        email: "test@essai.org",
        nom: "Test",
        prenom: "Essai",
        motDePasse: "passwordtest",
        isActif: true,
        isAdministrateur: true,
      },
    });

    // ✅ Mock de req.json() pour éviter l'erreur
    req.json = async () => ({
      email: "test@essai.org",
      nom: "Test",
      prenom: "Essai",
      motDePasse: "passwordtest",
      isActif: true,
      isAdministrateur: true,
    });

    // ✅ Simulation de la fonction POST
    const response = await POST(req);
    const bodyResponse = await response.json();

    // ✅ Assertions sur la réponse
    expect(response.status).toBe(201);
    expect(bodyResponse!.data.email).toBe("test@essai.org");
    expect(bodyResponse!.data.nom).toBe("Test");
    expect(bodyResponse!.data.prenom).toBe("Essai");
    expect(bodyResponse!.data.motDePasse).toBe("passwordtest");
    expect(bodyResponse!.data.isActif).toBe(true);
    expect(bodyResponse!.data.isAdministrateur).toBe(true);
  });

  it("devrait mettre à jour un utilisateur existant avec PUT", async () => {
    const updatedUtilisateur: Utilisateur = {
      id: 1,
      email: "lyazide@hotmail.co.uk",
      nom: "nom modifié",
      prenom: "prenom modifié",
      motDePasse: "password modifié",
      isActif: false,
      isAdministrateur: true,
    };

    // ✅ Mock de la mise à jour de utilisateur dans Prisma
    (prisma.utilisateur.update as jest.Mock).mockResolvedValue(
      updatedUtilisateur
    );

    // ✅ Création de mocks pour req et res
    const { req } = createMocks({
      method: "PUT",
      body: {
        id: 1,
        email: "lyazide@hotmail.co.uk",
        nom: "nom modifié",
        prenom: "prenom modifié",
        motDePasse: "password modifié",
        isActif: false,
        isAdministrateur: true,
      },
    });

    // ✅ Mock de req.json() pour éviter l'erreur
    req.json = async () => ({
      id: 1,
      email: "lyazide@hotmail.co.uk",
      nom: "nom modifié",
      prenom: "prenom modifié",
      motDePasse: "password modifié",
      isActif: false,
      isAdministrateur: true,
    });

    // ✅ Simulation de la fonction PUT
    const response = await PUT(req);
    const bodyResponse = await response.json();
    // ✅ Assertions sur la réponse
    expect(response.status).toBe(201);
    expect(bodyResponse!.data.email).toBe("lyazide@hotmail.co.uk");
    expect(bodyResponse!.data.nom).toBe("nom modifié");
    expect(bodyResponse!.data.prenom).toBe("prenom modifié");
    expect(bodyResponse!.data.motDePasse).toBe("password modifié");
    expect(bodyResponse!.data.isActif).toBe(false);
    expect(bodyResponse!.data.isAdministrateur).toBe(true);
  });

  it("devrait supprimer un utilisateur avec DELETE", async () => {
    const deletedDiagnostic: Utilisateur = {
      id: 1,
      email: "lyazide@hotmail.com",
      nom: "Oudjoudi",
      prenom: "Lyazide",
      motDePasse: "password123",
      isActif: true,
      isAdministrateur: false,
    };

    // ✅ Mock de la suppression de utilisateur dans Prisma
    (prisma.utilisateur.delete as jest.Mock).mockResolvedValue(
      deletedDiagnostic
    );

    // ✅ Création de mocks pour req et res
    const { req } = createMocks({
      method: "DELETE",
      body: { id: 1 },
    });

    // ✅ Mock de req.json() pour éviter l'erreur
    req.json = async () => ({ id: 1 });

    // ✅ Simulation de la fonction DELETE
    const response = await DELETE(req);
    const bodyResponse = await response.json();
    // ✅ Assertions sur la réponse
    expect(response.status).toBe(201);
    expect(bodyResponse!.data.id).toBe(1);
  });
});

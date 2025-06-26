import { createMocks } from "node-mocks-http";
import { GET, POST, PUT, DELETE } from "../signup/route";
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
/*jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, options) => {
      return new Response(JSON.stringify(data), {
        status: options?.status || 200,
        headers: { "Content-Type": "application/json" },
      });
    }),
  },
}));*/

// ✅ Mock de Prisma
jest.mock("@/utils/db", () => ({
  __esModule: true,
  default: {
    $disconnect: jest.fn(),
    utilisateur: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
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

  it("devrait renvoyer un utilisateur spécifique avec GET et un ID", async () => {
    /* const utilisateurData: Utilisateur = {
      id: 1,
      email: "lyazide@hotmail.com",
      nom: "Oudjoudi",
      prenom: "Lyazide",
      motDePasse: "password123",
      isActif: true,
      isAdministrateur: false,
    };*/

    // ✅ Mock de la réponse de Prisma
    (prisma.utilisateur.findUnique as jest.Mock).mockImplementation(
      ({ where }) => {
        return where.id === 1
          ? {
              id: 1,
              email: "lyazide@hotmail.com",
              nom: "Oudjoudi",
              prenom: "Lyazide",
              motDePasse: "password123",
              isActif: true,
              isAdministrateur: false,
            }
          : null; // ✅ Renvoie `null` si l'ID est inexistant
      }
    );

    // ✅ Création de mocks pour req et res
    //const { req } = createMocks();

    // ✅ Simulation de la fonction GET
    const req = createMocks({
      method: "GET",
      url: "http://localhost/api/signup?id=1",
    }).req;
    const response = await GET(req);
    const bodyResponse = await response.json();

    // ✅ Assertions sur la réponse

    expect(response?.status ?? 500).toBe(200);

    //expect(bodyResponse.data.length).toBe(1);
    expect(bodyResponse.id).toBe(1);
    expect(bodyResponse.email).toBe("lyazide@hotmail.com");
    expect(bodyResponse.nom).toBe("Oudjoudi");
    expect(bodyResponse.prenom).toBe("Lyazide");
    expect(bodyResponse.motDePasse).toBe("password123");
    expect(bodyResponse.isActif).toBe(true);
    expect(bodyResponse.isAdministrateur).toBe(false);
  });

  it("devrait renvoyer une erreur si aucun utilisateur n'est trouvé avec GET", async () => {
    // ✅ Mock de Prisma renvoyant une liste vide

    (prisma.utilisateur.findUnique as jest.Mock).mockImplementation(
      ({ where }) => {
        return where.id === 99 ? null : null; // ✅ Simule un ID inexistant
      }
    );

    // ✅ Création de mocks pour req et res
    //const { req } = createMocks();

    // ✅ Simulation de la fonction GET
    const req = createMocks({
      method: "GET",
      url: "http://localhost/api/signup?id=99",
    }).req;
    const response = await GET(req);
    const bodyResponse = await response.json();

    // ✅ Assertions sur la réponse
    //expect(response.status).toBe(404);
    expect(bodyResponse!.error).toBe("Utilisateur non trouvé.");
  });

  it("devrait créer un nouveau utilisateur avec POST", async () => {
    const newUtilisateur: Utilisateur = {
      id: 3,
      email: "test@essai.org",
      nom: "Test",
      prenom: "Essai",
      motDePasse: "passwordtest",
      isActif: true,
      isAdministrateur: true,
    };

    // ✅ Mock de la création de utilisateur dans Prisma
    (prisma.utilisateur.create as jest.Mock).mockResolvedValue(newUtilisateur);

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
    expect(bodyResponse!.email).toBe("test@essai.org");
    expect(bodyResponse!.nom).toBe("Test");
    expect(bodyResponse!.prenom).toBe("Essai");
    expect(bodyResponse!.motDePasse).toBe("passwordtest");
    expect(bodyResponse!.isActif).toBe(true);
    expect(bodyResponse!.isAdministrateur).toBe(true);
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
      url: "http://localhost/api/signup?id=1",
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
    expect(response.status).toBe(200);
    expect(bodyResponse!.email).toBe("lyazide@hotmail.co.uk");
    expect(bodyResponse!.nom).toBe("nom modifié");
    expect(bodyResponse!.prenom).toBe("prenom modifié");
    expect(bodyResponse!.motDePasse).toBe("password modifié");
    expect(bodyResponse!.isActif).toBe(false);
    expect(bodyResponse!.isAdministrateur).toBe(true);
  });

  it("devrait supprimer un utilisateur avec DELETE", async () => {
    const deletedUtilisateur: Utilisateur = {
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
      deletedUtilisateur
    );

    // ✅ Création de mocks pour req et res
    const { req } = createMocks({
      method: "DELETE",
      url: "http://localhost/api/signup?id=1",
    });

    // ✅ Mock de req.json() pour éviter l'erreur
    //req.json = async () => ({ id: 1 });

    // ✅ Simulation de la fonction DELETE
    const response = await DELETE(req);
    const bodyResponse = await response.json();
    // ✅ Assertions sur la réponse
    expect(response.status).toBe(200);
    expect(bodyResponse.error).toBe("Utilisateur supprimé avec succès.");
  });
});

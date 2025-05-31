import { createMocks } from "node-mocks-http";
import { GET, POST, PUT, DELETE } from "../detentes/route";
import prisma from "@/utils/db";
import Detente from "../../../types/detentes";

// ✅ Mock de NextResponse pour éviter l'erreur "Request is not defined"

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
    detente: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Detentes API", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Réinitialise les mocks avant chaque test
  });

  /*

  id: number;
  nom: string;
  description: string;
  duree: number;
  imagePath?: string | null;


*/

  it("devrait renvoyer une liste de detentes avec GET", async () => {
    const detentesData: Detente[] = [
      {
        id: 1,
        nom: "Detente 1",
        description: "Description 1",
        duree: 10,
        imagePath: "/path/to/image1.jpg",
      },
      {
        id: 2,
        nom: "Detente 2",
        description: "Description 2",
        duree: 20,
        imagePath: "/path/to/image2.jpg",
      },
    ];

    // ✅ Mock de la réponse de Prisma
    (prisma.detente.findMany as jest.Mock).mockResolvedValue(detentesData);

    // ✅ Création de mocks pour req et res
    //const { req } = createMocks();

    // ✅ Simulation de la fonction GET
    const response = await GET();
    const bodyResponse = await response.json();

    // ✅ Assertions sur la réponse

    expect(response?.status ?? 500).toBe(200);
    expect(bodyResponse!.data.length).toBe(2);
    expect(bodyResponse!.data[0].nom).toBe("Detente 1");
    expect(bodyResponse!.data[1].nom).toBe("Detente 2");
    expect(bodyResponse!.data[0].description).toBe("Description 1");
    expect(bodyResponse!.data[1].description).toBe("Description 2");
    expect(bodyResponse!.data[0].duree).toBe(10);
    expect(bodyResponse!.data[1].duree).toBe(20);
    expect(bodyResponse!.data[0].imagePath).toBe("/path/to/image1.jpg");
    expect(bodyResponse!.data[1].imagePath).toBe("/path/to/image2.jpg");
  });

  it("devrait renvoyer une erreur si aucun detente n'est trouvé avec GET", async () => {
    // ✅ Mock de Prisma renvoyant une liste vide
    (prisma.detente.findMany as jest.Mock).mockResolvedValue([]);

    // ✅ Création de mocks pour req et res
    //const { req } = createMocks();

    // ✅ Simulation de la fonction GET
    const response = await GET();
    const bodyResponse = await response.json();
    // ✅ Assertions sur la réponse
    expect(response.status).toBe(404);
    expect(bodyResponse!.error).toBe("No detentes found.");
  });

  it("devrait créer un nouveau detente avec POST", async () => {
    const newDiagnostic: Detente = {
      id: 3,
      nom: "Detente 3",
      description: "Description ",
      duree: 30,
      imagePath: "/path/to/image3.jpg",
    };

    // ✅ Mock de la création de detente dans Prisma
    (prisma.detente.create as jest.Mock).mockResolvedValue(newDiagnostic);

    // ✅ Création de mocks pour req et res
    const { req } = createMocks({
      method: "POST",
      body: {
        nom: "Detente 3",
        description: "Description ",
        duree: 30,
        imagePath: "/path/to/image3.jpg",
      },
    });

    // ✅ Mock de req.json() pour éviter l'erreur
    req.json = async () => ({
      nom: "Detente 3",
      description: "Description ",
      duree: 30,
      imagePath: "/path/to/image3.jpg",
    });

    // ✅ Simulation de la fonction POST
    const response = await POST(req);
    const bodyResponse = await response.json();

    // ✅ Assertions sur la réponse
    expect(response.status).toBe(201);
    expect(bodyResponse!.data.nom).toBe("Detente 3");
  });

  it("devrait mettre à jour un detente existant avec PUT", async () => {
    const updatedDiagnostic: Detente = {
      id: 1,
      nom: "Detente 1 modifiée",
      description: "Description modifiée",
      duree: 15,
      imagePath: "/path/to/imagex.jpg",
    };

    // ✅ Mock de la mise à jour de detente dans Prisma
    (prisma.detente.update as jest.Mock).mockResolvedValue(updatedDiagnostic);

    // ✅ Création de mocks pour req et res
    const { req } = createMocks({
      method: "PUT",
      body: {
        id: 1,
        nom: "Detente 1 modifié",
        description: "Description modifiée",
        duree: 15,
        imagePath: "/path/to/imagex.jpg",
      },
    });

    // ✅ Mock de req.json() pour éviter l'erreur
    req.json = async () => ({
      id: 1,
      nom: "Detente 1 modifiée",
      description: "Description modifiée",
      duree: 15,
      imagePath: "/path/to/imagex.jpg",
    });

    // ✅ Simulation de la fonction PUT
    const response = await PUT(req);
    const bodyResponse = await response.json();
    // ✅ Assertions sur la réponse
    expect(response.status).toBe(201);
    expect(bodyResponse!.data.nom).toBe("Detente 1 modifiée");
  });

  it("devrait supprimer un detente avec DELETE", async () => {
    const deletedDiagnostic: Detente = {
      id: 1,
      nom: "Detente 1",
      description: "Description 1",
      duree: 10,
      imagePath: "/path/to/image1.jpg",
    };

    // ✅ Mock de la suppression de detente dans Prisma
    (prisma.detente.delete as jest.Mock).mockResolvedValue(deletedDiagnostic);

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

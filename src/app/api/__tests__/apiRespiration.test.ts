import { createMocks } from "node-mocks-http";
import { GET, POST, PUT, DELETE } from "../respirations/route";
import prisma from "@/utils/db";
import Respiration from "../../../types/respirations";

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
    respiration: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Respirations API", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Réinitialise les mocks avant chaque test
  });

  /*

  id          Int        @id @default(autoincrement())
  nom         String
  description String?
  inspiration Int
  apnee       Int
  expiration  Int


*/

  it("devrait renvoyer une liste de respirations avec GET", async () => {
    const detentesData: Respiration[] = [
      {
        id: 1,
        nom: "Respiration 1",
        description: "Description 1",
        inspiration: 10,
        expiration: 11,
        apnee: 12,
      },
      {
        id: 2,
        nom: "Respiration 2",
        description: "Description 2",
        inspiration: 20,
        expiration: 21,
        apnee: 22,
      },
    ];

    // ✅ Mock de la réponse de Prisma
    (prisma.respiration.findMany as jest.Mock).mockResolvedValue(detentesData);

    // ✅ Création de mocks pour req et res
    //const { req } = createMocks();

    // ✅ Simulation de la fonction GET
    const response = await GET();
    const bodyResponse = await response.json();

    // ✅ Assertions sur la réponse

    expect(response?.status ?? 500).toBe(200);
    expect(bodyResponse!.data.length).toBe(2);
    expect(bodyResponse!.data[0].nom).toBe("Respiration 1");
    expect(bodyResponse!.data[1].nom).toBe("Respiration 2");
    expect(bodyResponse!.data[0].description).toBe("Description 1");
    expect(bodyResponse!.data[1].description).toBe("Description 2");
    expect(bodyResponse!.data[0].inspiration).toBe(10);
    expect(bodyResponse!.data[1].inspiration).toBe(20);
    expect(bodyResponse!.data[0].expiration).toBe(11);
    expect(bodyResponse!.data[1].expiration).toBe(21);
    expect(bodyResponse!.data[0].apnee).toBe(12);
    expect(bodyResponse!.data[1].apnee).toBe(22);
  });

  it("devrait renvoyer une erreur si aucun respiration n'est trouvé avec GET", async () => {
    // ✅ Mock de Prisma renvoyant une liste vide
    (prisma.respiration.findMany as jest.Mock).mockResolvedValue([]);

    // ✅ Création de mocks pour req et res
    //const { req } = createMocks();

    // ✅ Simulation de la fonction GET
    const response = await GET();
    const bodyResponse = await response.json();
    // ✅ Assertions sur la réponse
    expect(response.status).toBe(404);
    expect(bodyResponse!.error).toBe("No respirations found.");
  });

  it("devrait créer un nouveau respiration avec POST", async () => {
    const newDiagnostic: Respiration = {
      id: 3,
      nom: "Respiration 3",
      description: "Description 3",
      inspiration: 30,
      expiration: 31,
      apnee: 32,
    };

    // ✅ Mock de la création de respiration dans Prisma
    (prisma.respiration.create as jest.Mock).mockResolvedValue(newDiagnostic);

    // ✅ Création de mocks pour req et res
    const { req } = createMocks({
      method: "POST",
      body: {
        id: 3,
        nom: "Respiration 3",
        description: "Description 3",
        inspiration: 30,
        expiration: 31,
        apnee: 32,
      },
    });

    // ✅ Mock de req.json() pour éviter l'erreur
    req.json = async () => ({
      id: 3,
      nom: "Respiration 3",
      description: "Description 3",
      inspiration: 30,
      expiration: 31,
      apnee: 32,
    });

    // ✅ Simulation de la fonction POST
    const response = await POST(req);
    const bodyResponse = await response.json();

    // ✅ Assertions sur la réponse
    expect(response.status).toBe(201);
    expect(bodyResponse!.data.nom).toBe("Respiration 3");
    expect(bodyResponse!.data.description).toBe("Description 3");
    expect(bodyResponse!.data.inspiration).toBe(30);
    expect(bodyResponse!.data.expiration).toBe(31);
    expect(bodyResponse!.data.apnee).toBe(32);
    expect(bodyResponse!.data.id).toBe(3);
  });

  it("devrait mettre à jour un respiration existant avec PUT", async () => {
    const updatedDiagnostic: Respiration = {
      id: 1,
      nom: "Respiration 1 modifiée",
      description: "Description 1 modifiée",
      inspiration: 0,
      expiration: 1,
      apnee: 2,
    };

    // ✅ Mock de la mise à jour de respiration dans Prisma
    (prisma.respiration.update as jest.Mock).mockResolvedValue(
      updatedDiagnostic
    );

    // ✅ Création de mocks pour req et res
    const { req } = createMocks({
      method: "PUT",
      body: {
        id: 1,
        nom: "Respiration 1 modifiée",
        description: "Description 1 modifiée",
        inspiration: 0,
        expiration: 1,
        apnee: 2,
      },
    });

    // ✅ Mock de req.json() pour éviter l'erreur
    req.json = async () => ({
      id: 1,
      nom: "Respiration 1 modifiée",
      description: "Description 1 modifiée",
      inspiration: 0,
      expiration: 1,
      apnee: 2,
    });

    // ✅ Simulation de la fonction PUT
    const response = await PUT(req);
    const bodyResponse = await response.json();
    // ✅ Assertions sur la réponse
    expect(response.status).toBe(201);
    expect(bodyResponse!.data.nom).toBe("Respiration 1 modifiée");
    expect(bodyResponse!.data.description).toBe("Description 1 modifiée");
    expect(bodyResponse!.data.inspiration).toBe(0);
    expect(bodyResponse!.data.expiration).toBe(1);
    expect(bodyResponse!.data.apnee).toBe(2);
    expect(bodyResponse!.data.id).toBe(1);
  });

  it("devrait supprimer un respiration avec DELETE", async () => {
    const deletedDiagnostic: Respiration = {
      id: 1,
      nom: "Respiration 1 modifiée",
      description: "Description 1 modifiée",
      inspiration: 0,
      expiration: 1,
      apnee: 2,
    };

    // ✅ Mock de la suppression de respiration dans Prisma
    (prisma.respiration.delete as jest.Mock).mockResolvedValue(
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

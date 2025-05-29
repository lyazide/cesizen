import { createMocks } from "node-mocks-http";
import { GET, POST, PUT, DELETE } from "../diagnostics/route";
import prisma from "@/utils/db";
import Diagnostic from "../../../types/diagnostics";

// ✅ Mock de NextResponse pour éviter l'erreur "Request is not defined"
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      status: options?.status || 200,
      body: data,
    })),
  },
}));

// ✅ Mock de Prisma
jest.mock("@/utils/db", () => ({
  __esModule: true,
  default: {
    diagnostic: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Diagnostics API", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Réinitialise les mocks avant chaque test
  });

  it("devrait renvoyer une liste de diagnostics avec GET", async () => {
    const diagnosticsData: Diagnostic[] = [
      { id: 1, evenement: "Événement 1", points: 10 },
      { id: 2, evenement: "Événement 2", points: 20 },
    ];

    // ✅ Mock de la réponse de Prisma
    (prisma.diagnostic.findMany as jest.Mock).mockResolvedValue(
      diagnosticsData
    );

    // ✅ Création de mocks pour req et res
    const { req } = createMocks();

    // ✅ Simulation de la fonction GET
    const response = await GET(req);

    // ✅ Assertions sur la réponse

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(2);
    expect(response.body.data[0].evenement).toBe("Événement 1");
    expect(response.body.data[1].evenement).toBe("Événement 2");
    expect(response.body.data[0].points).toBe(10);
    expect(response.body.data[1].points).toBe(20);
  });

  it("devrait renvoyer une erreur si aucun diagnostic n'est trouvé avec GET", async () => {
    // ✅ Mock de Prisma renvoyant une liste vide
    (prisma.diagnostic.findMany as jest.Mock).mockResolvedValue([]);

    // ✅ Création de mocks pour req et res
    const { req } = createMocks();

    // ✅ Simulation de la fonction GET
    const response = await GET(req);

    // ✅ Assertions sur la réponse
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("No diagnostics found.");
  });

  it("devrait créer un nouveau diagnostic avec POST", async () => {
    const newDiagnostic: Diagnostic = {
      id: 3,
      evenement: "Événement 3",
      points: 30,
    };

    // ✅ Mock de la création de diagnostic dans Prisma
    (prisma.diagnostic.create as jest.Mock).mockResolvedValue(newDiagnostic);

    // ✅ Création de mocks pour req et res
    const { req } = createMocks({
      method: "POST",
      body: { evenement: "Événement 3", points: 30 },
    });

    // ✅ Mock de req.json() pour éviter l'erreur
    req.json = async () => ({ evenement: "Événement 3", points: 30 });

    // ✅ Simulation de la fonction POST
    const response = await POST(req);

    // ✅ Assertions sur la réponse
    expect(response.status).toBe(201);
    expect(response.body.data.evenement).toBe("Événement 3");
  });

  it("devrait mettre à jour un diagnostic existant avec PUT", async () => {
    const updatedDiagnostic: Diagnostic = {
      id: 1,
      evenement: "Événement 1 modifié",
      points: 15,
    };

    // ✅ Mock de la mise à jour de diagnostic dans Prisma
    (prisma.diagnostic.update as jest.Mock).mockResolvedValue(
      updatedDiagnostic
    );

    // ✅ Création de mocks pour req et res
    const { req } = createMocks({
      method: "PUT",
      body: { id: 1, evenement: "Événement 1 modifié", points: 15 },
    });

    // ✅ Mock de req.json() pour éviter l'erreur
    req.json = async () => ({
      id: 1,
      evenement: "Événement 1 modifié",
      points: 15,
    });

    // ✅ Simulation de la fonction PUT
    const response = await PUT(req);

    // ✅ Assertions sur la réponse
    expect(response.status).toBe(201);
    expect(response.body.data.evenement).toBe("Événement 1 modifié");
  });

  it("devrait supprimer un diagnostic avec DELETE", async () => {
    const deletedDiagnostic: Diagnostic = {
      id: 1,
      evenement: "Événement 1",
      points: 10,
    };

    // ✅ Mock de la suppression de diagnostic dans Prisma
    (prisma.diagnostic.delete as jest.Mock).mockResolvedValue(
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

    // ✅ Assertions sur la réponse
    expect(response.status).toBe(201);
    expect(response.body.data.id).toBe(1);
  });
});

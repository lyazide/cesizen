import { createMocks } from "node-mocks-http";
import { GET, POST, PUT, DELETE } from "../emotions/route";
import prisma from "@/utils/db";
import Emotion from "../../../types/emotions";

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
    emotion: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Emotions API", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Réinitialise les mocks avant chaque test
  });

  /*

  id          Int          @id @default(autoincrement())
  emotion     String?
  emotionBase String?
  Enregistre  Enregistre[]


*/

  it("devrait renvoyer une liste de emotions avec GET", async () => {
    const detentesData: Emotion[] = [
      {
        id: 1,
        emotion: "Emotion 1",
        emotionBase: "Emotion de Base 1",
      },
      {
        id: 2,
        emotion: "Emotion 2",
        emotionBase: "Emotion de Base 2",
      },
    ];

    // ✅ Mock de la réponse de Prisma
    (prisma.emotion.findMany as jest.Mock).mockResolvedValue(detentesData);

    // ✅ Création de mocks pour req et res
    //const { req } = createMocks();

    // ✅ Simulation de la fonction GET
    const response = await GET();
    const bodyResponse = await response.json();

    // ✅ Assertions sur la réponse

    expect(response?.status ?? 500).toBe(200);
    expect(bodyResponse!.data.length).toBe(2);
    expect(bodyResponse!.data[0].emotion).toBe("Emotion 1");
    expect(bodyResponse!.data[1].emotion).toBe("Emotion 2");
    expect(bodyResponse!.data[0].emotionBase).toBe("Emotion de Base 1");
    expect(bodyResponse!.data[1].emotionBase).toBe("Emotion de Base 2");
  });

  it("devrait renvoyer une erreur si aucun emotion n'est trouvé avec GET", async () => {
    // ✅ Mock de Prisma renvoyant une liste vide
    (prisma.emotion.findMany as jest.Mock).mockResolvedValue([]);

    // ✅ Création de mocks pour req et res
    //const { req } = createMocks();

    // ✅ Simulation de la fonction GET
    const response = await GET();
    const bodyResponse = await response.json();
    // ✅ Assertions sur la réponse
    expect(response.status).toBe(404);
    expect(bodyResponse!.error).toBe("No emotions found.");
  });

  it("devrait créer un nouveau emotion avec POST", async () => {
    const newDiagnostic: Emotion = {
      id: 3,
      emotion: "Emotion 3",
      emotionBase: "Emotion de Base 3",
    };

    // ✅ Mock de la création de emotion dans Prisma
    (prisma.emotion.create as jest.Mock).mockResolvedValue(newDiagnostic);

    // ✅ Création de mocks pour req et res
    const { req } = createMocks({
      method: "POST",
      body: {
        emotion: "Emotion 3",
        emotionBase: "Emotion de Base 3",
      },
    });

    // ✅ Mock de req.json() pour éviter l'erreur
    req.json = async () => ({
      emotion: "Emotion 3",
      emotionBase: "Emotion de Base 3",
    });

    // ✅ Simulation de la fonction POST
    const response = await POST(req);
    const bodyResponse = await response.json();

    // ✅ Assertions sur la réponse
    expect(response.status).toBe(201);
    expect(bodyResponse!.data.emotion).toBe("Emotion 3");
    expect(bodyResponse!.data.emotionBase).toBe("Emotion de Base 3");
  });

  it("devrait mettre à jour un emotion existant avec PUT", async () => {
    const updatedDiagnostic: Emotion = {
      id: 1,
      emotion: "Emotion 1 modifiée",
      emotionBase: "Emotion de Base 1 modifiée",
    };

    // ✅ Mock de la mise à jour de emotion dans Prisma
    (prisma.emotion.update as jest.Mock).mockResolvedValue(updatedDiagnostic);

    // ✅ Création de mocks pour req et res
    const { req } = createMocks({
      method: "PUT",
      body: {
        id: 1,
        emotion: "Emotion 1 modifiée",
        emotionBase: "Emotion de Base 1 modifiée",
      },
    });

    // ✅ Mock de req.json() pour éviter l'erreur
    req.json = async () => ({
      id: 1,
      emotion: "Emotion 1 modifiée",
      emotionBase: "Emotion de Base 1 modifiée",
    });

    // ✅ Simulation de la fonction PUT
    const response = await PUT(req);
    const bodyResponse = await response.json();
    // ✅ Assertions sur la réponse
    expect(response.status).toBe(201);
    expect(bodyResponse!.data.emotion).toBe("Emotion 1 modifiée");
    expect(bodyResponse!.data.emotionBase).toBe("Emotion de Base 1 modifiée");
  });

  it("devrait supprimer un emotion avec DELETE", async () => {
    const deletedDiagnostic: Emotion = {
      id: 1,
      emotion: "Emotion 1 modfiée",
      emotionBase: "Emotion de Base 1 modfiée",
    };

    // ✅ Mock de la suppression de emotion dans Prisma
    (prisma.emotion.delete as jest.Mock).mockResolvedValue(deletedDiagnostic);

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

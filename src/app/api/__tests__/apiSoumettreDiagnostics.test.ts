import { createMocks } from "node-mocks-http";
import { GET, POST, PUT, DELETE } from "../soumettreDiagnostic/route";
import prisma from "@/utils/db";
import SoumissionData from "../../../types/soumettreDiagnotics";

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
    soumet: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      createMany: jest.fn(),
    },
  },
}));

/*
  id: number;
  uuid: string;
  id_Diagnostic: number;
  id_Utilisateur: number;
  date_: Date;
*/

describe("Soumissions API", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Réinitialise les mocks avant chaque test
  });

  it("devrait renvoyer une liste de soumissions avec GET", async () => {
    const diagnosticsData: SoumissionData[] = [
      {
        id: 1,
        uuid: "uuid1",
        id_Diagnostic: 1,
        id_Utilisateur: 1,
        date_: new Date("2023-01-01T00:00:00Z"),
      },
      {
        id: 2,
        uuid: "uuid2",
        id_Diagnostic: 2,
        id_Utilisateur: 2,
        date_: new Date("2024-02-03T12:00:00Z"),
      },
    ];

    // ✅ Mock de la réponse de Prisma
    (prisma.soumet.findMany as jest.Mock).mockResolvedValue(diagnosticsData);

    // ✅ Création de mocks pour req et res
    //const { req } = createMocks();

    // ✅ Simulation de la fonction GET
    const response = await GET();
    const bodyResponse = await response.json();

    // ✅ Assertions sur la réponse

    expect(response?.status ?? 500).toBe(200);

    expect(bodyResponse!.data.length).toBe(2);
    expect(bodyResponse!.data[0].id).toBe(1);
    expect(bodyResponse!.data[1].id).toBe(2);
    expect(bodyResponse!.data[0].uuid).toBe("uuid1");
    expect(bodyResponse!.data[1].uuid).toBe("uuid2");
    expect(bodyResponse!.data[0].id_Diagnostic).toBe(1);
    expect(bodyResponse!.data[1].id_Diagnostic).toBe(2);
    expect(bodyResponse!.data[0].id_Utilisateur).toBe(1);
    expect(bodyResponse!.data[1].id_Utilisateur).toBe(2);
    expect(new Date(bodyResponse!.data[0].date_).toISOString()).toBe(
      "2023-01-01T00:00:00.000Z"
    );
    expect(new Date(bodyResponse!.data[1].date_).toISOString()).toBe(
      "2024-02-03T12:00:00.000Z"
    );
  });

  it("devrait renvoyer une erreur si aucun soumet n'est trouvé avec GET", async () => {
    // ✅ Mock de Prisma renvoyant une liste vide
    (prisma.soumet.findMany as jest.Mock).mockResolvedValue([]);

    // ✅ Création de mocks pour req et res
    //const { req } = createMocks();

    // ✅ Simulation de la fonction GET
    const response = await GET();
    const bodyResponse = await response.json();
    // ✅ Assertions sur la réponse
    expect(response.status).toBe(404);
    expect(bodyResponse!.error).toBe("No soumissions found.");
  });

  it("devrait créer un nouveau soumet avec POST", async () => {
    const newSoumission: SoumissionData = {
      id: 3,
      uuid: "uuid3",
      id_Diagnostic: 3,
      id_Utilisateur: 3,
      date_: new Date("2023-03-03T03:03:03Z"),
    };

    // ✅ Mock de la création de soumet dans Prisma
    (prisma.soumet.createMany as jest.Mock).mockResolvedValue(newSoumission);

    // ✅ Création de mocks pour req et res
    const { req } = createMocks({
      method: "POST",
      body: {
        soumissions: [
          {
            id: 3,
            uuid: "uuid3",
            id_Diagnostic: 3,
            id_Utilisateur: 3,
            date_: new Date("2023-03-03T03:03:03Z"),
          },
        ],
      },
    });

    // ✅ Mock de req.json() pour éviter l'erreur
    req.json = async () => ({
      soumissions: [
        {
          id: 3,
          uuid: "uuid3",
          id_Diagnostic: 3,
          id_Utilisateur: 3,
          date_: new Date("2023-03-03T03:03:03Z"),
        },
      ],
    });

    // ✅ Simulation de la fonction POST

    const response = await POST(req);
    const bodyResponse = await response.json();

    // ✅ Assertions sur la réponse

    expect(response.status).toBe(201);
    // expect(bodyResponse!.data.length).toBe(1);
    expect(bodyResponse!.results.id).toBe(3);
    expect(bodyResponse!.results.uuid).toBe("uuid3");
    expect(bodyResponse!.results.id_Diagnostic).toBe(3);
    expect(bodyResponse!.results.id_Utilisateur).toBe(3);
    expect(new Date(bodyResponse!.results.date_).toISOString()).toBe(
      "2023-03-03T03:03:03.000Z"
    );
  });

  it("devrait mettre à jour un soumet existant avec PUT", async () => {
    const updatedSoumission: SoumissionData = {
      id: 1,
      uuid: "uuid1 modifié",
      id_Diagnostic: 5,
      id_Utilisateur: 6,
      date_: new Date("2025-05-05T00:00:00Z"),
    };

    // ✅ Mock de la mise à jour de soumet dans Prisma
    (prisma.soumet.update as jest.Mock).mockResolvedValue(updatedSoumission);

    // ✅ Création de mocks pour req et res
    const { req } = createMocks({
      method: "PUT",
      body: {
        id: 1,
        uuid: "uuid1 modifié",
        id_Diagnostic: 5,
        id_Utilisateur: 6,
        date_: new Date("2025-05-05T00:00:00Z"),
      },
    });

    // ✅ Mock de req.json() pour éviter l'erreur
    req.json = async () => ({
      id: 1,
      uuid: "uuid1 modifié",
      id_Diagnostic: 5,
      id_Utilisateur: 6,
      date_: new Date("2025-05-05T00:00:00Z"),
    });

    // ✅ Simulation de la fonction PUT
    const response = await PUT(req);
    const bodyResponse = await response.json();

    // ✅ Assertions sur la réponse
    expect(response.status).toBe(200);
    expect(bodyResponse!.data.uuid).toBe("uuid1 modifié");
    expect(bodyResponse!.data.id_Diagnostic).toBe(5);
    expect(bodyResponse!.data.id_Utilisateur).toBe(6);
    expect(new Date(bodyResponse!.data.date_).toISOString()).toBe(
      "2025-05-05T00:00:00.000Z"
    );
  });

  it("devrait supprimer un soumet avec DELETE", async () => {
    const deletedDiagnostic: SoumissionData = {
      id: 1,
      uuid: "uuid1",
      id_Diagnostic: 1,
      id_Utilisateur: 1,
      date_: new Date("2023-01-01T00:00:00Z"),
    };

    // ✅ Mock de la suppression de soumet dans Prisma
    (prisma.soumet.delete as jest.Mock).mockResolvedValue(deletedDiagnostic);

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
    expect(response.status).toBe(200);
    expect(bodyResponse!.data.id).toBe(1);
  });
});

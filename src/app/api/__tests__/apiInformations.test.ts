import { createMocks } from "node-mocks-http";
import { GET, POST, PUT, DELETE } from "../informations/route";
import prisma from "@/utils/db";
import Information from "../../../types/informations";

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
    information: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Informations API", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Réinitialise les mocks avant chaque test
  });

  /*

  id               Int        @id @default(autoincrement())
  titre            String
  contenu          String
  dateCreation     DateTime   @db.Timestamp
  dateModification DateTime   @db.Timestamp


*/

  it("devrait renvoyer une liste de informations avec GET", async () => {
    const detentesData: Information[] = [
      {
        id: 1,
        titre: "Titre 1",
        contenu: "Contenu 1",
        dateCreation: new Date("2023-01-01T00:00:00Z"),
        dateModification: new Date("2023-01-02T00:00:00Z"),
      },
      {
        id: 2,
        titre: "Titre 2",
        contenu: "Contenu 2",
        dateCreation: new Date("2024-11-02T12:34:56Z"),
        dateModification: new Date("2024-01-02T01:23:45Z"),
      },
    ];

    // ✅ Mock de la réponse de Prisma
    (prisma.information.findMany as jest.Mock).mockResolvedValue(detentesData);

    // ✅ Création de mocks pour req et res
    //const { req } = createMocks();

    // ✅ Simulation de la fonction GET
    const response = await GET();
    const bodyResponse = await response.json();

    // ✅ Assertions sur la réponse

    expect(response?.status ?? 500).toBe(200);
    expect(bodyResponse!.data.length).toBe(2);
    expect(bodyResponse!.data[0].titre).toBe("Titre 1");
    expect(bodyResponse!.data[1].titre).toBe("Titre 2");
    expect(bodyResponse!.data[0].contenu).toBe("Contenu 1");
    expect(bodyResponse!.data[1].contenu).toBe("Contenu 2");
    expect(bodyResponse!.data[0].dateCreation).toBe("2023-01-01T00:00:00.000Z");
    expect(bodyResponse!.data[1].dateCreation).toBe("2024-11-02T12:34:56.000Z");
    expect(bodyResponse!.data[0].dateModification).toBe(
      "2023-01-02T00:00:00.000Z"
    );
    expect(bodyResponse!.data[1].dateModification).toBe(
      "2024-01-02T01:23:45.000Z"
    );
  });

  it("devrait renvoyer une erreur si aucun information n'est trouvé avec GET", async () => {
    // ✅ Mock de Prisma renvoyant une liste vide
    (prisma.information.findMany as jest.Mock).mockResolvedValue([]);

    // ✅ Création de mocks pour req et res
    //const { req } = createMocks();

    // ✅ Simulation de la fonction GET
    const response = await GET();
    const bodyResponse = await response.json();
    // ✅ Assertions sur la réponse
    expect(response.status).toBe(404);
    expect(bodyResponse!.error).toBe("No informations found.");
  });

  it("devrait créer un nouveau information avec POST", async () => {
    const newDiagnostic: Information = {
      id: 3,
      titre: "Titre 3",
      contenu: "Contenu 3",
      dateCreation: new Date("2024-11-02T12:34:56Z"),
      dateModification: new Date("2024-01-02T01:23:45Z"),
    };

    // ✅ Mock de la création de information dans Prisma
    (prisma.information.create as jest.Mock).mockResolvedValue(newDiagnostic);

    // ✅ Création de mocks pour req et res
    const { req } = createMocks({
      method: "POST",
      body: {
        id: 3,
        titre: "Titre 3",
        contenu: "Contenu 3",
        dateCreation: new Date("2024-11-02T12:34:56Z"),
        dateModification: new Date("2024-01-02T01:23:45Z"),
      },
    });

    // ✅ Mock de req.json() pour éviter l'erreur
    req.json = async () => ({
      id: 3,
      titre: "Titre 3",
      contenu: "Contenu 3",
      dateCreation: new Date("2024-11-02T12:34:56Z"),
      dateModification: new Date("2024-01-02T01:23:45Z"),
    });

    // ✅ Simulation de la fonction POST
    const response = await POST(req);
    const bodyResponse = await response.json();

    // ✅ Assertions sur la réponse
    expect(response.status).toBe(201);
    expect(bodyResponse!.data.titre).toBe("Titre 3");
    expect(bodyResponse!.data.contenu).toBe("Contenu 3");
    expect(bodyResponse!.data.dateCreation).toBe("2024-11-02T12:34:56.000Z");
    expect(bodyResponse!.data.dateModification).toBe(
      "2024-01-02T01:23:45.000Z"
    );
  });

  it("devrait mettre à jour un information existant avec PUT", async () => {
    const updatedDiagnostic: Information = {
      id: 1,
      titre: "Titre 1 modifié",
      contenu: "Contenu 1 modifié",
      dateCreation: new Date("2023-01-03T00:00:00Z"),
      dateModification: new Date("2023-01-04T00:00:00Z"),
    };

    // ✅ Mock de la mise à jour de information dans Prisma
    (prisma.information.update as jest.Mock).mockResolvedValue(
      updatedDiagnostic
    );

    // ✅ Création de mocks pour req et res
    const { req } = createMocks({
      method: "PUT",
      body: {
        id: 1,
        titre: "Titre 1 modifié",
        contenu: "Contenu 1 modifié",
        dateCreation: new Date("2023-01-03T00:00:00Z"),
        dateModification: new Date("2023-01-04T00:00:00Z"),
      },
    });

    // ✅ Mock de req.json() pour éviter l'erreur
    req.json = async () => ({
      id: 1,
      titre: "Titre 1 modifié",
      contenu: "Contenu 1 modifié",
      dateCreation: new Date("2023-01-03T00:00:00Z"),
      dateModification: new Date("2023-01-04T00:00:00Z"),
    });

    // ✅ Simulation de la fonction PUT
    const response = await PUT(req);
    const bodyResponse = await response.json();
    // ✅ Assertions sur la réponse
    expect(response.status).toBe(201);
    expect(response.status).toBe(201);
    expect(bodyResponse!.data.titre).toBe("Titre 1 modifié");
    expect(bodyResponse!.data.contenu).toBe("Contenu 1 modifié");
    expect(bodyResponse!.data.dateCreation).toBe("2023-01-03T00:00:00.000Z");
    expect(bodyResponse!.data.dateModification).toBe(
      "2023-01-04T00:00:00.000Z"
    );
    expect(bodyResponse!.data.id).toBe(1);
  });

  it("devrait supprimer un information avec DELETE", async () => {
    const deletedDiagnostic: Information = {
      id: 1,
      titre: "Titre 1 modifié",
      contenu: "Contenu 1 modifié",
      dateCreation: new Date("2023-01-03T00:00:00Z"),
      dateModification: new Date("2023-01-04T00:00:00Z"),
    };

    // ✅ Mock de la suppression de information dans Prisma
    (prisma.information.delete as jest.Mock).mockResolvedValue(
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

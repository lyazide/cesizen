import { GET } from "../dashboard/route";
import prisma from "@/utils/db";
import { NextRequest } from "next/server";

// Mock de NextResponse
/*jest.mock("next/server", () => ({
  NextResponse: {
    json: (data: any, options?: { status?: number }) =>
      new Response(JSON.stringify(data), {
        status: options?.status || 200,
        headers: { "Content-Type": "application/json" },
      }),
  },
}));
*/
// Mock de Prisma
jest.mock("@/utils/db", () => ({
  soumet: {
    findMany: jest.fn(),
  },
}));

describe("GET /api/dashboard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("retourne une erreur 400 si userId est absent", async () => {
    const req = new NextRequest("http://localhost/api/dashboard");
    const response = await GET(req);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toBe("ID utilisateur requis");
  });

  it("retourne la liste des diagnostics triés si userId est fourni", async () => {
    const mockDiagnostics = [
      { date_: "2024-05-01", Diagnostic: { points: 15 } },
      { date_: "2024-04-20", Diagnostic: { points: 10 } },
    ];

    (prisma.soumet.findMany as jest.Mock).mockResolvedValue(mockDiagnostics);

    const req = new NextRequest("http://localhost/api/dashboard?userId=7");
    const response = await GET(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(mockDiagnostics);

    expect(prisma.soumet.findMany).toHaveBeenCalledWith({
      where: { id_Utilisateur: 7 },
      select: {
        date_: true,
        Diagnostic: { select: { points: true } },
      },
      orderBy: { date_: "desc" },
    });
  });

  it("retourne une erreur 500 si Prisma plante", async () => {
    (prisma.soumet.findMany as jest.Mock).mockRejectedValue(
      new Error("Erreur base de données")
    );

    const req = new NextRequest("http://localhost/api/dashboard?userId=99");
    const response = await GET(req);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe("Erreur de récupération des diagnostics");
  });
});

import { GET } from "@/app/api/informations/route";
import { NextRequest } from "next/server";
import { Request } from "node-fetch"; // On importe la classe `Request` de node-fetch

describe("API Informations", () => {
  it("GET should return all informations", async () => {
    const requestMock = new Request("http://localhost:3000/api/informations");

    const response = await GET(requestMock as unknown as NextRequest);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data).toBeDefined();
  });
});

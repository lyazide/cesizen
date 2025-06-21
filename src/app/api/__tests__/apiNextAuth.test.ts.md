import { POST } from "@/app/api/auth/[...nextauth]/route";
import { createMocks } from "node-mocks-http";

// Mock de NextAuth internals pour éviter les appels vers jose/openid-client
jest.mock("next-auth/core", () => ({
  ...jest.requireActual("next-auth/core"),
  parse: jest.fn(() => ({})),
  encode: jest.fn(() => ""),
}));

describe("API Auth [...nextauth] POST", () => {
  it("devrait retourner une réponse même avec des credentials vides", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {
        username: "",
        password: "",
      },
    });

    // ⚠️ simulate req.json() comme le fait Next.js
    req.json = async () => ({
      username: "",
      password: "",
    });

    const response = await POST(req);
    expect(response).toBeDefined();
    expect(typeof response.status).toBe("function"); // pour vérifier que c'est un NextResponse
  });
});

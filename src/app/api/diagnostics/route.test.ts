/**
 * @jest-environment node
 */
import { POST } from "../diagnostics/route";
import prisma from "@/utils/db";

// Mock prisma
// Ensure the mocked prisma client is aligned with the diagnostic structure
jest.mock("@/utils/db", () => ({
  __esModule: true,
  default: {
    diagnostic: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

it("should return added data with status 201", async () => {
  const requestObj = {
    json: async () => ({ evenement: "Event 1", points: 100 }),
  } as any;

  // Mock the prisma client to return a value
  (prisma.diagnostic.create as jest.Mock).mockResolvedValue({
    id: 1,
    evenement: "Event 1",
    points: 100,
  });

  // Call the POST function
  const response = await POST(requestObj);
  const body = await response.json();

  // Check the response
  expect(response.status).toBe(201);
  expect(body.data).toMatchObject({
    id: 1,
    evenement: "Event 1",
    points: 100,
  });
  expect(prisma.diagnostic.create).toHaveBeenCalledTimes(1);
});

it("should return status 400 when request body is missing fields", async () => {
  const requestObj = {
    json: async () => ({}),
  } as any;

  const response = await POST(requestObj);
  const body = await response.json();

  expect(response.status).toBe(400);
  expect(body.error).toEqual(expect.any(String));
  expect(prisma.diagnostic.create).not.toHaveBeenCalled();
});

it("should return status 500 when prisma query rejects", async () => {
  const requestObj = {
    json: async () => ({ evenement: "Event 1", points: 100 }),
  } as any;

  // Mock the prisma client to reject the query
  (prisma.diagnostic.create as jest.Mock).mockRejectedValue(
    new Error("Failed to create diagnostic")
  );

  const response = await POST(requestObj);
  const body = await response.json();

  expect(response.status).toBe(500);
  expect(body.error).toEqual(expect.any(String));
});

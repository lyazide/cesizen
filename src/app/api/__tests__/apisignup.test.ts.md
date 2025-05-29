/**
 * @jest-environment node
 */
import request from "supertest";
import { createServer, Server } from "http";
import { GET } from "../signup/route"; // Remplacez par le bon chemin
import { NextRequest } from "next/server";

describe("API Utilisateurs - GET", () => {
  let server: Server;

  beforeAll(() => {
    server = createServer(async (req, res) => {
      const nextReq = new NextRequest(req);
      const response = await GET(nextReq);
      res.writeHead(response.status, { "Content-Type": "application/json" });
      response.body && res.write(await response.text());
      res.end();
    }).listen(4000);
  });

  afterAll(() => {
    server.close();
  });

  test("Devrait récupérer tous les utilisateurs", async () => {
    const res = await request(server).get("/api/utilisateurs");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Devrait récupérer un utilisateur spécifique", async () => {
    const res = await request(server).get("/api/utilisateurs?id=1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
  });

  test("Devrait retourner une erreur 404 si l'utilisateur n'existe pas", async () => {
    const res = await request(server).get("/api/utilisateurs?id=99999");
    expect(res.status).toBe(404);
  });

  test("Devrait gérer les erreurs du serveur", async () => {
    jest.spyOn(global, "fetch").mockRejectedValue(new Error("Erreur serveur"));
    const res = await request(server).get("/api/utilisateurs");
    expect(res.status).toBe(500);
  });
});
/*
it("should return added data with status 201", async () => {
  const requestObj = {
    json: async () => ({
      evenement: "Evenement 1",
      points: 10,
    }),
  };

  const response = await POST(requestObj);
  const body = await response.json();

  expect(response.status).toBe(201);
  expect(body.data.id).toEqual(expect.any(Number));
  lastEventId = body.data.id;
  console.log(body);
  expect(body.data.evenement).toBe("Evenement 1");
  expect(body.data.points).toBe(10);
});

it("should return updated data with status 201", async () => {
  const requestObj = {
    json: async () => ({
      id: lastEventId,
      evenement: "Evenement 2",
      points: 11,
    }),
  };

  const response = await PUT(requestObj);
  const body = await response.json();

  expect(response.status).toBe(201);
  expect(body.data.id).toEqual(expect.any(Number));
  console.log(body);
  expect(body.data.evenement).toBe("Evenement 2");
  expect(body.data.points).toBe(11);
});

it("should return deleted data with status 201", async () => {
  if (!lastEventId) {
    throw new Error("Aucun événement à supprimer !");
  }
  const requestObj = {
    json: async () => ({
      id: lastEventId,
    }),
  };

  const response = await DELETE(requestObj);
  const body = await response.json();

  expect(response.status).toBe(201);
  //expect(body.data.id).toEqual(expect.any(Number));
  console.log(body);
  //expect(body.data.evenement).toBe('Evenement 2');
  //expect(body.data.points).toBe(11);
});
*/

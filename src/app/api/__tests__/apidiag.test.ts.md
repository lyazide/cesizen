/**
 * @jest-environment node
 */
import { GET, POST, PUT, DELETE } from "../diagnostics/route";

let lastEventId: number;

it("should return data with status 200", async () => {
  const response = await GET();
  // const body = await response.json();
  //console.log(body);
  expect(response.status).toBe(200);
  //expect(body.data.length).toBe(62);
});

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
  //console.log(body);
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
  // const body = await response.json();

  expect(response.status).toBe(201);
  expect(body.data.id).toEqual(expect.any(Number));
  //console.log(body);
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
  //console.log(body);
  //expect(body.data.evenement).toBe('Evenement 2');
  //expect(body.data.points).toBe(11);
});

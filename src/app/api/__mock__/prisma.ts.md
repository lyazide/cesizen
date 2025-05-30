import { jest } from "@jest/globals";

const prismaMock = {
  diagnostic: {
    findMany: jest.fn().mockResolvedValue([
      { id: 1, evenement: "Mock Event 1", points: 10 },
      { id: 2, evenement: "Mock Event 2", points: 20 },
    ]),
    create: jest
      .fn()
      .mockResolvedValue({ id: 3, evenement: "New Event", points: 30 }),
    update: jest
      .fn()
      .mockResolvedValue({ id: 1, evenement: "Updated Event", points: 40 }),
    delete: jest.fn().mockResolvedValue({ id: 1 }),
  },
};

export default prismaMock;

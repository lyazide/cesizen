jest.mock("@/utils/db", () => ({
  diagnostic: {
    findMany: jest.fn().mockResolvedValue([]),
    create: jest
      .fn()
      .mockResolvedValue({ id: 1, evenement: "Test", points: 10 }),
    update: jest
      .fn()
      .mockResolvedValue({ id: 1, evenement: "Updated Test", points: 15 }),
    delete: jest
      .fn()
      .mockResolvedValue({ id: 1, evenement: "Test", points: 10 }),
  },
}));

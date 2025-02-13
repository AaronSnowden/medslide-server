const { getAppMetadata } = require("../api/domains/metadata");

// Mock Firebase database
const db = {
  ref: jest.fn(() => ({
    once: jest.fn(),
  })),
};

describe("getAppMetadata", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return metadata when data exists", async () => {
    const mockData = { version: "1.0.0", appName: "TestApp" };

    db.ref().once.mockResolvedValue({
      exists: () => true,
      val: () => mockData,
    });

    const result = await getAppMetadata();
    expect(result).toEqual(mockData);
  });

  test("should return error when no data exists", async () => {
    db.ref().once.mockResolvedValue({
      exists: () => false,
    });

    const result = await getAppMetadata();
    expect(result).toEqual({ error: "No data found" });
  });

  test("should return Internal Server Error when an error occurs", async () => {
    db.ref().once.mockRejectedValue(new Error("DB connection failed"));

    const result = await getAppMetadata();
    expect(result).toEqual({ error: "Internal Server Error" });
  });
});

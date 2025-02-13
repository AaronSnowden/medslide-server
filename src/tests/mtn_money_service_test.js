const axios = require("axios");
const MTNMoneyService = require("../../services/mtnMoneyService");

describe("MTNMoneyService", () => {
  let mtnService;

  beforeEach(() => {
    jest.clearAllMocks();
    mtnService = new MTNMoneyService();
  });

  describe("getAuthToken", () => {
    it("should return valid auth token", async () => {
      const mockToken = "mock-token-123";
      axios.post.mockResolvedValueOnce({ data: { access_token: mockToken } });

      const token = await mtnService.getAuthToken();

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/token"),
        expect.any(Object),
        expect.any(Object)
      );
      expect(token).toBe(mockToken);
    });

    it("should throw error on auth failure", async () => {
      axios.post.mockRejectedValueOnce(new Error("Auth failed"));

      await expect(mtnService.getAuthToken()).rejects.toThrow("Auth failed");
    });
  });

  describe("initiatePayment", () => {
    it("should initiate payment successfully", async () => {
      const mockReference = "123456";
      const mockPayload = {
        phoneNumber: "256771234567",
        amount: 5000,
        reference: mockReference,
      };

      jest
        .spyOn(mtnService, "getAuthToken")
        .mockResolvedValueOnce("mock-token");
      axios.post.mockResolvedValueOnce({ data: { status: "PENDING" } });

      const result = await mtnService.initiatePayment(
        mockPayload.phoneNumber,
        mockPayload.amount,
        mockPayload.reference
      );

      expect(result).toEqual({ transactionId: mockReference });
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/requesttopay"),
        expect.any(Object),
        expect.any(Object)
      );
    });
  });
});

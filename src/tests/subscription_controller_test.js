const subscriptionController = require("../../controllers/subscriptionController");
const subscriptionService = require("../../services/subscriptionService");

jest.mock("../../services/subscriptionService");

describe("SubscriptionController", () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest = {
      params: {},
      body: {},
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("subscribe", () => {
    it("should create subscription successfully", async () => {
      const mockSubscriptionData = {
        userId: "user123",
        planId: "premium",
        amount: 5000,
        phoneNumber: "256771234567",
        provider: "mtn",
      };

      mockRequest.body = mockSubscriptionData;

      subscriptionService.createSubscription.mockResolvedValueOnce({
        subscriptionId: "sub123",
        transactionId: "txn123",
      });

      await subscriptionController.subscribe(mockRequest, mockResponse);

      expect(subscriptionService.createSubscription).toHaveBeenCalledWith(
        mockSubscriptionData.userId,
        mockSubscriptionData.planId,
        mockSubscriptionData.amount,
        mockSubscriptionData.phoneNumber,
        mockSubscriptionData.provider
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        subscriptionId: "sub123",
        transactionId: "txn123",
      });
    });

    it("should handle errors properly", async () => {
      mockRequest.body = {};
      subscriptionService.createSubscription.mockRejectedValueOnce(
        new Error("Subscription failed")
      );

      await subscriptionController.subscribe(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: "Subscription failed",
      });
    });
  });

  describe("checkStatus", () => {
    it("should return subscription status", async () => {
      mockRequest.params.userId = "user123";

      const mockStatus = {
        isActive: true,
        subscriptionId: "sub123",
        plan: "premium",
      };

      subscriptionService.checkSubscriptionStatus.mockResolvedValueOnce(
        mockStatus
      );

      await subscriptionController.checkStatus(mockRequest, mockResponse);

      expect(subscriptionService.checkSubscriptionStatus).toHaveBeenCalledWith(
        "user123"
      );
      expect(mockResponse.json).toHaveBeenCalledWith(mockStatus);
    });
  });
});

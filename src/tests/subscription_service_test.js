const SubscriptionService = require("../../services/subscriptionService");
const SubscriptionModel = require("../../models/subscription");
const MTNMoneyService = require("../../services/mtnMoneyService");
const AirtelMoneyService = require("../../services/airtelMoneyService");

jest.mock("../../models/subscription");
jest.mock("../../services/mtnMoneyService");
jest.mock("../../services/airtelMoneyService");

describe("SubscriptionService", () => {
  let subscriptionService;

  beforeEach(() => {
    jest.clearAllMocks();
    subscriptionService = new SubscriptionService();
  });

  describe("createSubscription", () => {
    const mockSubscriptionData = {
      userId: "user123",
      planId: "premium",
      amount: 5000,
      phoneNumber: "256771234567",
      provider: "mtn",
    };

    it("should create MTN subscription successfully", async () => {
      const mockTransactionId = "txn123";
      MTNMoneyService.initiatePayment.mockResolvedValueOnce({
        transactionId: mockTransactionId,
      });

      SubscriptionModel.create.mockResolvedValueOnce({
        id: "sub123",
        ...mockSubscriptionData,
        transactionId: mockTransactionId,
      });

      const result = await subscriptionService.createSubscription(
        mockSubscriptionData.userId,
        mockSubscriptionData.planId,
        mockSubscriptionData.amount,
        mockSubscriptionData.phoneNumber,
        mockSubscriptionData.provider
      );

      expect(result).toEqual({
        subscriptionId: "sub123",
        transactionId: mockTransactionId,
      });
      expect(MTNMoneyService.initiatePayment).toHaveBeenCalled();
      expect(SubscriptionModel.create).toHaveBeenCalled();
    });

    it("should throw error for invalid provider", async () => {
      await expect(
        subscriptionService.createSubscription(
          mockSubscriptionData.userId,
          mockSubscriptionData.planId,
          mockSubscriptionData.amount,
          mockSubscriptionData.phoneNumber,
          "invalid"
        )
      ).rejects.toThrow("Invalid payment provider");
    });
  });

  describe("checkSubscriptionStatus", () => {
    it("should return active subscription status", async () => {
      const mockSubscription = {
        id: "sub123",
        userId: "user123",
        plan: "premium",
        status: "active",
        startDate: { toDate: () => new Date() },
        endDate: { toDate: () => new Date(Date.now() + 86400000) }, // Tomorrow
        amount: 5000,
        provider: "mtn",
        transactionId: "txn123",
      };

      SubscriptionModel.getUserActiveSubscription.mockResolvedValueOnce(
        mockSubscription
      );

      const result = await subscriptionService.checkSubscriptionStatus(
        "user123"
      );

      expect(result.isActive).toBe(true);
      expect(result.subscriptionId).toBe("sub123");
      expect(result.remainingDays).toBeGreaterThan(0);
    });

    it("should return inactive status for expired subscription", async () => {
      const mockSubscription = {
        id: "sub123",
        endDate: { toDate: () => new Date(Date.now() - 86400000) }, // Yesterday
      };

      SubscriptionModel.getUserActiveSubscription.mockResolvedValueOnce(
        mockSubscription
      );
      SubscriptionModel.updateStatus.mockResolvedValueOnce();

      const result = await subscriptionService.checkSubscriptionStatus(
        "user123"
      );

      expect(result.isActive).toBe(false);
      expect(result.message).toBe("Subscription expired");
      expect(SubscriptionModel.updateStatus).toHaveBeenCalledWith(
        "sub123",
        "expired"
      );
    });
  });
});

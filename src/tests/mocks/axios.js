jest.mock("axios");

// tests/models/subscription.model.test.js
const { admin, db } = require("../../config/firebase");
const SubscriptionModel = require("../../models/subscription");

describe("SubscriptionModel", () => {
  let subscriptionModel;

  beforeEach(() => {
    jest.clearAllMocks();
    subscriptionModel = new SubscriptionModel();
  });

  describe("create", () => {
    it("should create a new subscription", async () => {
      const mockData = {
        userId: "user123",
        plan: "premium",
        amount: 5000,
      };

      const mockDoc = {
        id: "sub123",
        data: () => mockData,
      };

      mockAdd.mockResolvedValueOnce({ get: () => Promise.resolve(mockDoc) });

      const result = await subscriptionModel.create(mockData);

      expect(mockCollection).toHaveBeenCalledWith("subscriptions");
      expect(mockAdd).toHaveBeenCalledWith(expect.objectContaining(mockData));
      expect(result).toEqual({ id: "sub123", ...mockData });
    });
  });

  describe("getUserActiveSubscription", () => {
    it("should return active subscription for user", async () => {
      const mockSubscription = {
        id: "sub123",
        userId: "user123",
        status: "active",
      };

      const mockSnapshot = {
        empty: false,
        docs: [
          {
            id: "sub123",
            data: () => mockSubscription,
          },
        ],
      };

      mockGet.mockResolvedValueOnce(mockSnapshot);

      const result = await subscriptionModel.getUserActiveSubscription(
        "user123"
      );

      expect(mockWhere).toHaveBeenCalledWith("userId", "==", "user123");
      expect(mockWhere).toHaveBeenCalledWith("status", "==", "active");
      expect(result).toEqual({ id: "sub123", ...mockSubscription });
    });

    it("should return null when no active subscription exists", async () => {
      const mockSnapshot = {
        empty: true,
        docs: [],
      };

      mockGet.mockResolvedValueOnce(mockSnapshot);

      const result = await subscriptionModel.getUserActiveSubscription(
        "user123"
      );

      expect(result).toBeNull();
    });
  });
});

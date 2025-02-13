class AirtelMoneyService {
  constructor() {
    this.baseURL = process.env.AIRTEL_API_BASE_URL;
    this.clientId = process.env.AIRTEL_CLIENT_ID;
    this.clientSecret = process.env.AIRTEL_CLIENT_SECRET;
    this.subscriptionCallbackUrl = process.env.SUBSCRIPTION_CALLBACK_URL;
  }

  async getAuthToken() {
    try {
      const response = await axios.post(`${this.baseURL}/auth/oauth2/token`, {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: "client_credentials",
      });
      return response.data.access_token;
    } catch (error) {
      console.error("Airtel token error:", error);
      throw error;
    }
  }

  async initiatePayment(phoneNumber, amount, reference) {
    const token = await this.getAuthToken();
    try {
      const response = await axios.post(
        `${this.baseURL}/merchant/v1/payments/`,
        {
          reference: reference,
          subscriber: {
            country: "UG",
            currency: "UGX",
            msisdn: phoneNumber,
          },
          transaction: {
            amount: amount,
            country: "UG",
            currency: "UGX",
            id: reference,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return { transactionId: reference };
    } catch (error) {
      console.error("Airtel payment error:", error);
      throw error;
    }
  }

  async checkPaymentStatus(transactionId) {
    const token = await this.getAuthToken();
    try {
      const response = await axios.get(
        `${this.baseURL}/merchant/v1/payments/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.status;
    } catch (error) {
      console.error("Airtel status check error:", error);
      throw error;
    }
  }
}

module.exports = new AirtelMoneyService();

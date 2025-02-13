const axios = require("axios");
const https = require("https");
const fetch = require("node-fetch");

class MTNMoneyService {
  constructor() {
    this.baseURL = process.env.MTN_API_BASE_URL;
    this.apiUser = process.env.MTN_API_USER;
    this.apiKey = process.env.MTN_API_KEY;
    this.subscriptionCallbackUrl = process.env.SUBSCRIPTION_CALLBACK_URL;
  }

  async getAuthToken() {
    const auth = Buffer.from(`${this.apiUser}:${this.apiKey}`).toString(
      "base64"
    );
    try {
      const response = await axios.post(
        `${this.baseURL}/collection/token/`,

        {},
        {
          headers: {
            Authorization: `Basic ${auth}`,
            "Ocp-Apim-Subscription-Key": process.env.MTN_SUBSCRIPTION_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.error("MTN token error:", error);
      throw error;
    }
  }

  async initiatePayment(phoneNumber, amount, reference) {
    const token = await this.getAuthToken();
    try {
      const response = await axios.post(
        `${this.baseURL}/collection/v1_0/requesttopay`,
        {
          amount: amount.toString(),
          currency: "EUR",
          externalId: reference,
          payer: {
            partyIdType: "MSISDN",
            partyId: phoneNumber,
          },
          payerMessage: "Subscription Payment",
          payeeNote: "Subscription Payment",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Reference-Id": reference,
            "X-Target-Environment": process.env.MTN_ENVIRONMENT,
            "Ocp-Apim-Subscription-Key": process.env.MTN_SUBSCRIPTION_KEY,
          },
        }
      );
      return { transactionId: reference };
    } catch (error) {
      console.error("MTN payment error:", error);
      throw error;
    }
  }

  async checkPaymentStatus(transactionId) {
    const token = await this.getAuthToken();
    try {
      const response = await axios.get(
        `${this.baseURL}/collection/v1_0/requesttopay/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Target-Environment": process.env.MTN_ENVIRONMENT,
            "Ocp-Apim-Subscription-Key": process.env.MTN_SUBSCRIPTION_KEY,
          },
        }
      );
      return response.data.status;
    } catch (error) {
      console.error("MTN status check error:", error);
      throw error;
    }
  }
}

module.exports = new MTNMoneyService();

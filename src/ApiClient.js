import axios from "axios";

class ApiClient {
  async fetchTransactionData(uuid) {
    try {
      const response = await axios.get(
        "https://acquiring.foreignpay.ru/webhook/front_transaction",
        {
          params: {
            uuid: uuid,
          },
        }
      );
      return {
        transactionData: response.data,
        redirectUrl: response.data.url_redirect,
      };
    } catch (error) {
      console.error("Error fetching transaction data:", error);
      throw error;
    }
  }

  async fetchBanksList() {
    try {
      const response = await axios.get(
        "https://qr.nspk.ru/proxyapp/c2bmembers.json"
      );

      return response.data.dictionary;
    } catch (error) {
      console.error("Can't fetch banks list");
      throw error;
    }
  }
}

export default new ApiClient();

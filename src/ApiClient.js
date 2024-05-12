import axios from "axios";

class ApiClient {
    constructor() {
        this.baseUrl = "https://acquiring.foreignpay.ru/webhook/";
    }

    async fetchTransactionData(uuid) {
        try {
            const response = await axios.get(`${this.baseUrl}transaction?uuid=${uuid}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching transaction data:", error);
            throw error;
        }
    }

    async sendPaymentData(uuid, data) {
        try {
            const response = await axios.post(`${this.baseUrl}front/card_into`, { ...data, uuid });
            return response.data;
        } catch (error) {
            console.error("Error sending payment data:", error);
            throw error;
        }
    }
}

export default new ApiClient();

import axios from "axios";

class ApiClient {
    constructor() {
        this.baseUrl = process.env.REACT_APP_API_HOST;
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

    async sendPaymentData(data) {
        try {
            const response = await axios.post(`${this.baseUrl}front/card_into`, data);
            return response.data;
        } catch (error) {
            console.error("Error sending payment data:", error);
            throw error;
        }
    }
}

export default new ApiClient();

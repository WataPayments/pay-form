import axios from "axios";

class ApiClient {


    async fetchTransactionData(uuid) {
        try {
            const response = await axios.get('https://acquiring.foreignpay.ru/webhook/front_transaction', {
                params: {
                    'uuid': 'uuid'
                }
            });
            console.log(response);
            return {
                transactionData: response.data,
                redirectUrl: response.data.url_redirect
            };
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

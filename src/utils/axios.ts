import axios from "axios";
import { config as envConfig } from "../config";

const apiClient = axios.create({
	baseURL: "https://api-sepolia.etherscan.io/api",
});

apiClient.interceptors.request.use((config) => {
	config.params = {
		...config.params,
		apikey: envConfig.ETHERSCAN_API_KEY,
	};
	return config;
});

export default apiClient;

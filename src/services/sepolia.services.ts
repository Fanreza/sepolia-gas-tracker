import apiClient from "../utils/axios";

export async function fetchGasPrice() {
	try {
		const response = await apiClient.get("", {
			params: {
				module: "proxy",
				action: "eth_gasPrice",
			},
		});
		console.log("Gas Price:", response.data.result);
		return response.data.result;
	} catch (error) {
		console.error("Error fetching gas price:", error);
		throw error;
	}
}

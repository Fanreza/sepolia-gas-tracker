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

		const gasPriceInWei = parseInt(response.data.result, 16);
		const gasPriceInGwei = gasPriceInWei / 1e9;

		return gasPriceInGwei;
	} catch (error) {
		console.error("Error fetching gas price:", error);
		throw error;
	}
}

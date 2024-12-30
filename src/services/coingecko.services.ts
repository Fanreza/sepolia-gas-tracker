import axios from "axios";

export async function convertGweiToUSD(gweiAmount: number) {
	try {
		const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
		const ethPrice = response.data.ethereum.usd;

		// Convert Gwei to ETH
		const ethAmount = gweiAmount / 1_000_000_000;

		// Convert ETH to USD
		const usdAmount = ethAmount * ethPrice;
		console.log(`ETH Amount: ${ethAmount}`);
		console.log(`${gweiAmount} Gwei is equivalent to $${usdAmount.toFixed(8)} USD`);

		return usdAmount;
	} catch (error) {
		console.error("Error fetching Ethereum price:", error);
	}
}

import { ActivityType, Client, GatewayIntentBits, SlashCommandBuilder } from "discord.js";
import { config } from "./config";

import { fetchGasPrice } from "./services/sepolia.services";
import { convertGweiToUSD } from "./services/coingecko.services";

const client = new Client({
	intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once("ready", () => {
	console.log("Discord bot is ready! 🤖");

	setInterval(async () => {
		const gasPrice = await fetchGasPrice();

		client.user?.setActivity(`⛽${gasPrice.toFixed(1)}`, { type: ActivityType.Watching });
	}, 30000);
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === "gas") {
		const gasPrice = await fetchGasPrice();

		const usdAmount = (await convertGweiToUSD(gasPrice)) || 0;

		await interaction.reply(`⛽ Current gas price: ${gasPrice.toFixed(1)} Gwei | **$${usdAmount.toFixed(8)} USD**`);
	}
});

client.login(config.DISCORD_TOKEN);

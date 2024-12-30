import { ActivityType, Client, GatewayIntentBits, SlashCommandBuilder } from "discord.js";
import { config } from "./config";

import { fetchGasPrice } from "./services/sepolia.services";

const client = new Client({
	intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once("ready", () => {
	console.log("Discord bot is ready! 🤖");

	setInterval(async () => {
		const gasPrice = await fetchGasPrice();

		const gasPriceInWei = parseInt(gasPrice, 16);
		const gasPriceInGwei = gasPriceInWei / 1e9;

		client.user?.setActivity(`⛽${gasPriceInGwei.toFixed(1)}`, { type: ActivityType.Watching });
	}, 30000);
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === "gas") {
		const gasPrice = await fetchGasPrice();

		const gasPriceInWei = parseInt(gasPrice, 16);
		const gasPriceInGwei = gasPriceInWei / 1e9;

		await interaction.reply(`⛽ Current gas price: ${gasPriceInGwei.toFixed(1)} Gwei`);
	}
});

client.login(config.DISCORD_TOKEN);

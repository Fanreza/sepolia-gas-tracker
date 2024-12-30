import { Guild, REST, Routes, SlashCommandBuilder } from "discord.js";
import { config } from "../config";

const rest = new REST().setToken(config.DISCORD_TOKEN);
const GUILD = "1084797248845652109";

const slashRegister = async () => {
	try {
		await rest.put(Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, GUILD), {
			body: [new SlashCommandBuilder().setName("gas").setDescription("Replies with sepolia gas prices")],
		});
	} catch (error) {
		console.log(error);
	}
};

slashRegister();

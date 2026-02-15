import dotenv from 'dotenv';
dotenv.config();
import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ] 
});

client.on('messageCreate', message => {
    console.log(message.content);
    if (message.author.bot) return;
    message.reply('Hi from bot!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    interaction.reply('Two!');
});

client.login(process.env.DISCORD_BOT_TOKEN);
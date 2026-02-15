import dotenv from 'dotenv';
dotenv.config();
import { REST, Routes } from 'discord.js';
const commands = [
    {
        name: 'one',
        description: 'Replies with Two!',
    },
];

// rest client
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

(async function main() {
    try{
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
            { body: commands },
        );
        console.log('Successfully reloaded application (/) commands.');
    }
    catch(error){
        console.error(error);
    }
})();
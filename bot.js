const TOKEN = ''; // Token del bot
const CLIENT_ID = ''; // ID del bot
const GUILD_ID = ''; // ID del servidor

const { GatewayIntentBits, Client, Collection } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.on('ready', async (client) => {
  console.log('Estoy Listo')
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith('.')) return;

  try {
    const command = message.content.toLowerCase().slice(1).split('')[0];
    console.log(command)
    const executeCommand = require(`./events/${command}.js`);
    executeCommand(message);
  } catch (error) {
    console.log(`${message.content} no es un comando valido.`)
  }
});

commands = [];
client.commands = new Collection();
const commandFiles = ['automod.js'];

commandFiles.slice(0, 11).forEach((file) => {
  const command = require(`./commands/${file}`);

  commands.push(command.data.toJSON()); // Esto sera enviado al REST
  client.commands.set(command.data.name, command);
});

const rest = new Rest({ version: '10' }).setToken(TOKEN); // Preparando el REST (Discord.js v14 trabaja con Discord API v10)

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
  body: commands,
})
.then(() => console.log('Comandos enviados al REST (/)'))
.catch(console.error);

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    console.log(`Comando ejecutado en el bot: ${client.user.username}`);
    console.log(`Comando ejecutado: ${command.data.name}`);
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    interaction.reply({
      content: 'Hubo un error al ejecutar ese comando.',
      ephemeral: false, // Oculta el mensaje de error al usuario
    });
  }
});

client.login(TOKEN)

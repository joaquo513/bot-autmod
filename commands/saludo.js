const {SlashCommandBuilder} = require(' discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setname('Saludo')
        .setDescription('Un buen saludo por la mañana'),
    execute( interaction ) {
        interaction.reply(`Buenos dias como estas? ${interaction.username}!,`);
    }
}
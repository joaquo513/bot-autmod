const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('automod')
        .setDescription('setup tyhe auto mod system')
        .addSubcommand(command => command.setName('Flagged-words').setDescription('Block profanity, sexual content, and slurs'))
        .addSubcommand(command => command.setName('spam-messages').setDescription('Block messages suspect of spam'))
        .addSubcommand(command => command.setName('mention-spam').setDescription('Block messages containing a certaing amount of mention').addIntegerOption(option => option.setName('number').setDescription('The number of mentions required to block a messages').setRequired(true)))
        .addSubcommand(command => command.setName('keyword').setDescription('block a given keyword in the server').addStringOption(option => option.setname('word').setDescription('the word you want to block').setRequired(true))),

    execute: async (interaction) => {
        const { guild, options } = interaction;
        const sub = options.getSubcommand();

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
            return await interaction.reply({ content: `you dont have perms to setup automod within this server `, ephemeral: true })

        switch (sub) {
            case 'flagged-words':
                await interaction.reply({ content: `loading your automod rule....` });

                const rule = await guild.autoModerationRules.create({
                    name: `Block profanity, sexual content`,
                    creatorId: '722886048618643476',
                    enabled: true,
                    eventType: 1,
                    triggerType: 4,
                    triggerMetaData:
                    {
                        presets: [1, 2, 3]
                    },
                    actions: [
                        {
                            type: 1,
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessages: 'this message was prevented by automod'
                        }
                    ]
                }).catch(async err => {
                    console.log(err);
                    await interaction.editReply({ content: `${err}` });
                })

                if (!rule) return;

                const embed = new EmbedBuilder()
                    .setColor("Blue")
                    .setDescription(`:white_check_markl  You automod rule has been created- all swears will be stopped by automod`)

                await interaction.editReply({ content: ``, embeds: [embed] });
                break;

            case 'keyword':

                await interaction.reply({ content: `loading your automod rule....` });
                const word = options.getString('word');

                const rule2 = await guild.autoModerationRules.create({
                    name: `prevent the word ${word} from automod`,
                    creatorId: '722886048618643476',
                    enabled: true,
                    eventType: 1,
                    triggerType: 1,
                    triggerMetaData:
                    {
                        keywordFilter: [`${word}`]
                    },
                    actions: [
                        {
                            type: 1,
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessages: 'this message was prevented by automod'
                        }
                    ]
                }).catch(async err => {
                    console.log(err);
                    await interaction.editReply({ content: `${err}` });
                })
                if (!rule2) return;

                const embed2 = new EmbedBuilder()
                    .setColor("Blue")
                    .setDescription(`:white_check_markl  You automod rule has been created- all messages containing the word ${word} will be delete`)

                await interaction.editReply({ content: ``, embeds: [embed2] });
                break;

            case 'spam-messages':

                await interaction.reply({ content: `loading your automod rule....` });
                const number = options.getString('number');

                const rule3 = await guild.autoModerationRules.create({
                    name: `prevent spam messages by automod`,
                    creatorId: '722886048618643476',
                    enabled: true,
                    eventType: 1,
                    triggerType: 3,
                    triggerMetaData:
                    {
                        //mentionTotalLimit: number
                    },
                    actions: [
                        {
                            type: 1,
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessages: 'this message was prevented by automod'
                        }
                    ]
                }).catch(async err => {
                    console.log(err);
                    await interaction.editReply({ content: `${err}` });
                })
                if (!rule3) return;

                const embed3 = new EmbedBuilder()
                    .setColor("Blue")
                    .setDescription(`:white_check_markl  You automod rule has been created`)

                await interaction.editReply({ content: ``, embeds: [embed3] });
                break;

            case 'mention-spam':

                await interaction.reply({ content: `loading your automod rule....` });

                const rule4 = await guild.autoModerationRules.create({
                    name: `prevent spam mentions  by automod `,
                    creatorId: '997579584981717024',
                    enabled: true,
                    eventType: 1,
                    triggerType: 5,
                    triggerMetaData:
                    {
                        mentionTotalLimit: number
                    },
                    actions: [
                        {
                            type: 1,
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessages: 'this message was prevented by automod'
                        }
                    ]
                }).catch(async err => {
                    console.log(err);
                    await interaction.editReply({ content: `${err}` });
                })
                if (!rule4) return;

                const embed4 = new EmbedBuilder()
                    .setColor("Blue")
                    .setDescription(`:white_check_markl  You automod rule has been created- all messages suspect`)

                await interaction.editReply({ content: ``, embeds: [embed4] });
        }
    }
}
const { ButtonBuilder } = require("@discordjs/builders");
const { stripIndent } = require("common-tags");
const { EmbedBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const client = require("../../index.js");
const server = require("../../config/server.json");
module.exports = {
    name: "rulesLoaded"
};

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId == 'rule') {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Accept')
                    .setStyle(ButtonStyle.Success)
                    .setCustomId('accept'),

                new ButtonBuilder()
                    .setLabel('Discord Terms & Service')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.com/terms'),

                new ButtonBuilder()
                    .setLabel('Discord Community Guildlines')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.com/guidelines')
            )
        const embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.guild.name}'s Discord Rule`, iconURL: `${interaction.guild.iconURL()}` })
            .setDescription(stripIndent`
            **[#Rule 1]** No spamming, advertising, & sending NSFW content in server. Don't be hash or abuse others.

            **[#Rule 2]** For specific topic conversations make sure you're responding in the correct channels.

            **[#Rule 3]** When you are asking for help, make sure to provide as much detail as possible with errors. If you are asking for "how to make discord bot", or "m-my bot is not working", or source code, we will not reply or help in this case.

            **[#Rule 4]** Don't dms or ping any staff or member asking for help, this will leads to ban.

            **[#Rule 5]** Have conversation in english as there are users globally
            
            **[#Rule 6]** Don't ask for promotion or higher roles in our community.

            **[#Rule 7]** Don't argue with our moderators/staffs.
            `)
            .setImage(`${server.images.rulesimage}`)
            .setColor(`#2f3136`)
        interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: true
        })
    }
})
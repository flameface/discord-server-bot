const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Client, Message } = require('discord.js');
const server = require("../../config/server.json")

module.exports = {
    name: "setup",
    aliases: ["s"],
    ownerOnly: true,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     */
    run: async (client, message, args) => {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('rule')
                    .setLabel('View Rules')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji("📚"),

                new ButtonBuilder()
                    .setCustomId('role')
                    .setLabel('Select Role')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("🖊"),

                new ButtonBuilder()
                    .setCustomId("feedback")
                    .setLabel('FeedBack')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("⭐")
            )

        const embed = new EmbedBuilder()
            .setAuthor({ name: `Welcome to ${message.guild.name}` })
            .setImage(server.images.welcomeimage)
            .setColor(`#2f3136`)
        message.channel.send({
            embeds: [embed],
            components: [row]
        })
    }
}
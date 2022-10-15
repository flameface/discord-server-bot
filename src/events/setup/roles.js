const { ButtonBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const client = require("../../index.js")
const server = require("../../config/server.json")

module.exports = {
    name: "rolesLoaded"
};

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    const member = await interaction.message.guild.members.fetch({
        user: interaction.user.id,
        force: true
    })

    if (interaction.customId == 'role') {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Announcements')
                    .setCustomId('announcements')
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setLabel('Youtube')
                    .setCustomId('youtube')
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setLabel('Polls')
                    .setCustomId('polls')
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setLabel('Giveaways')
                    .setCustomId('giveaways')
                    .setStyle(ButtonStyle.Success)
            )
        const embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.guild.name}'s Discord Rule`, iconURL: `${interaction.guild.iconURL()}` })
            .setImage(`${server.images.rolesimage}`)
            .setColor(`#2f3136`)
        interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: true
        })
    }

    if (interaction.customId == 'announcements') {
        if (!member.roles.cache.has(`${server.roles.announcementrole}`)) {
            await member.roles.add(`${server.roles.announcementrole}`)
            return interaction.reply({ content: `**[Added]** Announcements Role`, ephemeral: true })
        } else if (member.roles.cache.has(`${server.roles.announcementrole}`)) {
            await member.roles.remove(`${server.roles.announcementrole}`)
            return interaction.reply({ content: `**[Removed]** Announcements Role`, ephemeral: true })
        }
    }
    else if (interaction.customId == 'youtube') {
        if (!member.roles.cache.has(`${server.roles.youtuberole}`)) {
            await member.roles.add(`${server.roles.youtuberole}`)
            return interaction.reply({ content: `**[Added]** Youtube Role`, ephemeral: true })
        } else if (member.roles.cache.has(`${server.roles.youtuberole}`)) {
            await member.roles.remove(`${server.roles.youtuberole}`)
            return interaction.reply({ content: `**[Removed]** Youtube Role`, ephemeral: true })
        }
    }
    else if (interaction.customId == 'polls') {
        if (!member.roles.cache.has(`${server.roles.pollrole}`)) {
            await member.roles.add(`${server.roles.pollrole}`)
            return interaction.reply({ content: `**[Added]** Polls Role`, ephemeral: true })
        } else if (member.roles.cache.has(`${server.roles.pollrole}`)) {
            await member.roles.remove(`${server.roles.pollrole}`)
            return interaction.reply({ content: `**[Removed]** Polls Role`, ephemeral: true })
        }
    }
    else if (interaction.customId == 'giveaways') {
        if (!member.roles.cache.has(`${server.roles.giveawayrole}`)) {
            await member.roles.add(`${server.roles.giveawayrole}`)
            return interaction.reply({ content: `**[Added]** Giveaways Role`, ephemeral: true })
        } else if (member.roles.cache.has(`${server.roles.giveawayrole}`)) {
            await member.roles.remove(`${server.roles.giveawayrole}`)
            return interaction.reply({ content: `**[Removed]** Giveaways Role`, ephemeral: true })
        }
    }
    else if (interaction.customId == 'accept') {
        if (!member.roles.cache.has(`${server.roles.acceptrole}`)) {
            await member.roles.add(`${server.roles.acceptrole}`)
            return interaction.reply({ content: `${interaction.member} hope you will follow all the rules, now you have access to all server`, ephemeral: true })
        } else if (member.roles.cache.has(`${server.roles.acceptrole}`)) {
            return interaction.reply({ content: `${interaction.member} you have already accepted the rules`, ephemeral: true })
        }
    }
})
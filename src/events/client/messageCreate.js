const client = require('../../index');
const config = require('../../config/config.json');

module.exports = {
    name: "messageCreate"
};

client.on('messageCreate', async (message) => {
    if (message.channel.type !== 0) return;
    if (message.author.bot) return;
    if (!message.content.startsWith(config.PREFIX)) return;
    if (!message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(config.PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;

    let command = client.commands.get(cmd);

    if (!command) command = client.commands.get(client.aliases.get(cmd))

    if (command) {
        if (command.ownerOnly) {
            if (!config.OWNER.includes(message.member.id)) {
                message.reply({
                    content: `**${message.member}** You can't access community owner commands`,
                })
                return;
            }
        }

        try {
            command.run(client, message, args);
        } catch (err) {
            console.log(err);
        }
    }
})
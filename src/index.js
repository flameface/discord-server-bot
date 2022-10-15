require('./console/watermark')
const { Client, Partials, Collection } = require('discord.js');
const colors = require('colors');
const config = require('./config/config.json');

const client = new Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildPresences",
        "GuildMessageReactions",
        "DirectMessages",
        "MessageContent",
        "GuildVoiceStates",
        "GuildMembers",
        "DirectMessageTyping"
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction
    ]
})

if (!config.TOKEN) {
    console.log("[WARN] Token for discord bot is required! put your token in config file".yellow.bold + "\n")
    return process.exit();
};

if (!config.OWNER) {
    console.log("[WARN] Owner ID required! put your owner id in config file".yellow.bold + "\n")
    return process.exit();
};

client.config = require('./config/config.json')
client.commands = new Collection()
client.events = new Collection()
client.aliases = new Collection()

module.exports = client;

["command", "event"].forEach(file => {
    require(`./handlers/${file}`)(client);
});

client.login(config.TOKEN)
    .catch((err) => {
        console.log("[CRUSH] Something went wrong while connecting to your bot" + "\n");
        console.log("[CRUSH] Error from DiscordAPI :" + err);
        process.exit();
    })

process.on("unhandledRejection", async (err) => {
    console.log(`[ANTI - CRUSH] Unhandled Rejection : ${err}`.red.bold)
    console.log(err)
})
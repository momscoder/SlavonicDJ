require("dotenv").config();

const Discord = require("discord.js");
const { Manager } = require("erela.js-dj");

const nodes = [
  {
    host: process.env.LAVA_HOST,
    password: process.env.LAVA_PASS,
    port: +process.env.LAVA_PORT,
  },
];

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.timers = new Discord.Collection();

client.manager = new Manager({
  nodes,
  send: (id, payload) => {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
  trackPartial: ["title", "duration", "requester", "duration"],
});

["command_handler", "event_handler"].forEach((handler) =>
  require(`./handlers/${handler}`)(client, Discord)
);

client.login(process.env.DS_TOKEN);

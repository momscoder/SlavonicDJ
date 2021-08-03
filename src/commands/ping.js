module.exports = {
  name: "ping",
  aliases: ["pi", "pin"],
  description: "pong",
  async execute(client, message, args) {
    message.channel.send("pong!");
  },
};

module.exports = {
  name: "ping",
  aliases: ["pi", "pin"],
  description: "pong",
  async execute(message) {
    message.channel.send("pong!");
  },
};

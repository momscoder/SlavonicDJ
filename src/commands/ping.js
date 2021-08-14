module.exports = {
  name: "ping",
  aliases: ["pi", "pin"],
  description: "Понг!",
  cooldown: 5,
  async execute(message) {
    message.channel.send("pong!");
  },
};

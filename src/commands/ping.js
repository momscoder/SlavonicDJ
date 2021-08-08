module.exports = {
  name: "ping",
  aliases: ["pi", "pin"],
  description: "Понг!",
  async execute(message) {
    message.channel.send("pong!");
  },
};

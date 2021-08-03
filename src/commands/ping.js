module.exports = {
  name: "ping",
  description: "pong",
  async execute(client, message, args) {
    message.channel.send("pong!");
  },
};

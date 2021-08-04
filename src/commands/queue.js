const Duration = require("luxon").Duration;

module.exports = {
  name: "queue",
  aliases: ["q"],
  description: "Music command",
  async execute(message, args) {
    const player = message.client.manager.get(message.guild.id);
    if (!player) return message.reply("Cейчас ничего не играет.");

    const queue = player.queue;
    let answer = "";

    const tracks = queue.slice(0, 10);

    if (queue.current)
      answer += `> ${queue.current.title} (-${Duration.fromMillis(
        queue.current.duration - player.position
      ).toFormat("mm:ss")})\n`;

    if (tracks.length)
      answer += tracks.map((track, i) => `${++i}) ${track.title}`).join("\n");

    return message.channel.send("```" + answer + "```");
  },
};

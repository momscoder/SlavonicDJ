const Duration = require("luxon").Duration;

module.exports = {
  name: "playing",
  aliases: ["now"],
  description: "Показывает, что сейчас играет",
  cooldown: 2,
  async execute(message) {
    const player = message.client.manager.get(message.guild.id);
    if (!player?.queue.current) return message.reply("Cейчас ничего не играет");

    const { channel } = message.member.voice;

    if (!channel)
      return message.reply(
        "Вы должны находиться в голосовом канале для использования этой команды!"
      );

    if (channel.id !== player.voiceChannel)
      return message.reply("Вы находитесь не в том голосовом канале...");

    const { title, requester, duration } = player.queue.current;
    return message.channel.send(
      `Сейчас ${
        player.paused ? "на паузе" : "играет"
      } : *${title}* (-${Duration.fromMillis(
        duration - player.position
      ).toFormat("mm:ss")}) [${requester}] `
    );
  },
};

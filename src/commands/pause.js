module.exports = {
  name: "pause",
  aliases: ["pa", "ps"],
  description: "Music command",
  async execute(message) {
    const player = message.client.manager.get(message.guild.id);
    if (!player) return message.reply("Сейчас ничего не играет");

    const { channel } = message.member.voice;

    if (!channel)
      return message.reply(
        "Вы должны находиться в голосовом канале для использования этой команды!"
      );

    if (channel.id !== player.voiceChannel)
      return message.reply("Вы находитесь не в том голосовом канале...");

    if (player.paused) {
      if (message.client.timers.has(message.guild.id))
        clearTimeout(message.client.timers.get(message.guild.id));
      return player.pause(false);
    }
    message.client.timers.set(
      message.guild.id,
      setTimeout(() => {
        message.channel
          .send(`**Слишком долгое время ожидания, отключаюсь.**`)
          .then((msg) => msg.delete({ timeout: 15000 }));
        if (player) player.destroy();
      }, 600000)
    );

    return player.pause(true);
  },
};

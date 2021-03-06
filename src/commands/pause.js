module.exports = {
  name: "pause",
  aliases: ["pa", "ps"],
  description: "Ставит трек на паузу/возобновляет трек с паузы",
  cooldown: 2,
  async execute(message) {
    const player = message.client.manager.get(message.guild.id);
    if (!player?.queue.current) return message.reply("Сейчас ничего не играет");

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
      message.channel.send("Снимаю с паузы");
      return player.pause(false);
    }
    message.client.timers.set(
      message.guild.id,
      setTimeout(() => {
        if (player) {
          message.channel
            .send(`**Слишком долгое время ожидания, отключаюсь.**`)
            .then((msg) => msg.delete({ timeout: 15000 }));
          player.destroy();
        }
      }, 600000)
    );

    message.channel.send("Ставлю на паузу");
    return player.pause(true);
  },
};

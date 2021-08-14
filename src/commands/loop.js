module.exports = {
  name: "loop",
  aliases: ["l", "repeat"],
  description: "Зациклиливает/разцикливает плейлист",
  cooldown: 2,
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

    if (!player.queue.length)
      return message.channel.send("```0_0 Очередь пуста```");

    if (player.queueRepeat) {
      player.setQueueRepeat(false);
      return message.channel.send("Очередь больше не зацикливается!");
    } else {
      player.setQueueRepeat(true);
      return message.channel.send("Зациклил очередь!");
    }
  },
};

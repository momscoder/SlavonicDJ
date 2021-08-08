module.exports = {
  name: "clear",
  aliases: ["cl"],
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

    if (!player.queue.length)
      return message.channel.send("```0_0 Очередь пуста```");

    player.queue.clear();
    player.stop();
    return message.channel.send("Очередь очищена!");
  },
};

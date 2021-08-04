module.exports = {
  name: "skip",
  aliases: ["s"],
  description: "Music command",
  async execute(message) {
    const player = message.client.manager.get(message.guild.id);
    if (!player) return message.reply("Cейчас ничего не играет");

    const { channel } = message.member.voice;

    if (!channel)
      return message.reply(
        "Вы должны находиться в голосовом канале для использования этой команды!"
      );

    if (channel.id !== player.voiceChannel)
      return message.reply("Вы находитесь не в том голосовом канале...");

    if (!player.queue.current) return message.reply("Очередь пуста");

    const { title } = player.queue.current;

    player.stop();
    return message.channel
      .send(`Песня **${title}** пропущена.`)
      .then((msg) => msg.delete({ timeout: 15000 }));
  },
};

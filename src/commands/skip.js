module.exports = {
  name: "skip",
  aliases: ["s"],
  description: "Пропускает один трек",
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

    if (!player.queue.current) return message.channel.send("Нечего пропускать");

    const { title } = player.queue.current;

    if (!player.playing) player.playing = true;
    player.stop();
    return message.channel.send(`Песня **${title}** пропущена.`);
  },
};

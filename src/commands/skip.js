module.exports = {
  name: "skip",
  aliases: ["s"],
  description: "Пропускает n треков (по умолчанию 1)",
  async execute(message, args) {
    const player = message.client.manager.get(message.guild.id);
    if (!player?.queue.current) return message.reply("Cейчас ничего не играет");

    const { channel } = message.member.voice;

    if (!channel)
      return message.reply(
        "Вы должны находиться в голосовом канале для использования этой команды!"
      );

    if (channel.id !== player.voiceChannel)
      return message.reply("Вы находитесь не в том голосовом канале...");

    const { title } = player.queue.current;

    if (!player.playing) player.playing = true;
    if (args.length && Number.isInteger(+args[0]) && +args[0] !== 1) {
      player.queue.pointer += +args[0] - 1;
      player.stop();
      return message.channel.send(`Пропущено **${args[0]}** песен`);
    }
    player.stop();
    return message.channel.send(`Песня **${title}** пропущена.`);
  },
};

module.exports = {
  name: "shuffle",
  aliases: ["sh"],
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

    if (!player.queue.current) return message.reply("Очередь пуста.");

    player.queue.shuffle();
    message.channel.send(`Очередь была перемешана [${message.author}]`);
  },
};

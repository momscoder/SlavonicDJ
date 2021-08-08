module.exports = {
  name: "shuffle",
  aliases: ["sh", "random"],
  description: "Перемешивает очередь",
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

    if (!player.queue.length) return message.reply("```0_0 Очередь пуста```");

    player.queue.shuffle();

    player.queue.pointer = 0;
    player.queue.current = player.queue[0];
    player.play();

    message.channel.send(`Очередь была перемешана [${message.author}]`);
  },
};

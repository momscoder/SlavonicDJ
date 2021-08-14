module.exports = {
  name: "remove",
  aliases: ["r", "delete", "del"],
  description: "Удаляет трек с номером n",
  cooldown: 2,
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

    const queue = player.queue;

    if (!args.length) return;
    let n = parseInt(args[0]);

    if (!isNaN(n) && n > 0 && n <= queue.length) {
      n--;
      if (queue.pointer >= n) {
        if (queue.pointer === n) player.stop();
        queue.pointer--;
      }
      queue.remove(n);
    } else return;

    return message.channel.send("Удалено");
  },
};

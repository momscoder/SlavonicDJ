const vkdl = require("../services/vkdl");

const queue = new Map();
// queue(message.guild.id, queue_constructor object {voice channel, text channel, connection, song[]})

module.exports = {
  name: "play",
  aliases: ["skip", "stop"],
  description: "Music command",
  async execute(message, args, cmd) {
    //standard checks
    const voice_channel = message.member.voice.channel;
    if (!voice_channel)
      return message.channel.send(
        "Вы должны находиться в голосовом канале для использования этой команды!"
      );
    const permissions = voice_channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK"))
      return message.channel.send("Не хватает прав!");

    const server_queue = queue.get(message.guild.id);

    // если заменить на свитч-кейс, то по моему не читабельно
    if (cmd === "play") {
      if (!args.length) return message.channel.send("...");
      let song = {};

      song = await vkdl.findByTitle(args.join(" "));

      if (!server_queue) {
        const queue_constructor = {
          voice_channel: voice_channel,
          text_channel: message.channel,
          connection: null,
          songs: [],
        };

        queue.set(message.guild.id, queue_constructor);
        queue_constructor.songs.push(song);

        try {
          const connection = await voice_channel.join();
          queue_constructor.connection = connection;
          vk_player(message.guild, queue_constructor.songs[0]);
        } catch (err) {
          queue.delete(message.guild.id);
          message.channel.send("Ошибка подключения!");
          throw err;
        }
      } else {
        server_queue.songs.push(song);
        return message.channel.send(
          `Песня '${song.title}' добавлена в очередь!`
        );
      }
    } else if (cmd === "skip") skip_song(message, server_queue);
    else if (cmd === "stop") stop_song(message, server_queue);
  },
};

const vk_player = async (guild, song) => {
  const song_queue = queue.get(guild.id);

  if (!song) {
    song_queue.voice_channel.leave();
    queue.delete(guild.id);
    return;
  }

  song_queue.connection
    .play(song.url, { seek: 0, volume: 0.4 })
    .on("finish", () => {
      song_queue.songs.shift();
      vk_player(guild, song_queue.songs[0]);
    });

  await song_queue.text_channel.send(`Сейчас играет: ${song.title}`);
};

const skip_song = (message, server_queue) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Вы должны находиться в голосовом канале для использования этой команды!"
    );
  if (!server_queue) {
    return message.channel.send("Очередь пуста ¯\\_(ツ)_/¯");
  }

  server_queue.connection.dispatcher.end();
};

const stop_song = (message, server_queue) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Вы должны находиться в голосовом канале для использования этой команды!"
    );
  server_queue.songs = [];
  server_queue.connection.dispatcher.end();
};

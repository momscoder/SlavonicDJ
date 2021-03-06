const vkdl = require("../services/vkdl");

module.exports = {
  name: "play",
  aliases: ["p", "pl", "add", "a"],
  description: "Ищет музыку и добавляет её в очередь",
  cooldown: 2,
  usage: "<song name / --id song content id>",
  examples: ["Bad Apple!!", "--id -2001239486_66239486"],
  async execute(message, args) {
    //standard checks
    const voice_channel = message.member.voice.channel;
    if (!voice_channel)
      return message.reply(
        "Вы должны находиться в голосовом канале для использования этой команды!"
      );
    const permissions = voice_channel.permissionsFor(message.client.user);
    if (
      !permissions.has("CONNECT") ||
      !permissions.has("SPEAK") ||
      !permissions.has("VIEW_CHANNEL")
    )
      return message.channel.send("Не хватает прав!");

    //if (!args.length) return message.channel.send("...");
    const player = message.client.manager.create({
      guild: message.guild.id,
      voiceChannel: voice_channel.id,
      textChannel: message.channel.id,
      selfDeafen: true,
    });

    if (
      (!args.length && !player.paused && player.queue.pointer !== null) ||
      (!args.length && player.queue.pointer === null && !player.queue.length)
    ) {
      return; //message.channel.send("...");
    }

    if (player.paused) player.pause(false);
    if (message.client.timers.has(message.guild.id))
      clearTimeout(message.client.timers.get(message.guild.id));

    if (!args.length && player.queue.length && player.queue.pointer === null) {
      player.queue.pointer = 0;
      player.queue.current = player.queue[0];
      player.play();
    }

    if (!args.length) return;

    let song = {};

    if (args[0] === "--id") {
      song = await vkdl.findById(args[1]);
    } else {
      song = await vkdl.findByTitle(args.join(" "));
    }

    if (!song) return message.channel.send("Ничего не найдено");

    let res;

    try {
      res = await player.search(song.url);
      if (res.loadType === "LOAD_FAILED") {
        if (!player.queue.current) player.destroy();
        throw res.exception;
      }
    } catch (err) {
      return message.reply(`Ошибка: ${err.message}`);
    }

    switch (res.loadType) {
      case "NO_MATCHES":
        if (!player.queue.current) player.destroy();
        return message.reply("Ошибка! `NO_MATCHES`");
      case "TRACK_LOADED":
        res.tracks[0].title = song.title;
        res.tracks[0].requester = message.author;
        res.tracks[0].duration = song.duration;

        player.queue.add(res.tracks[0]);

        if (!player.playing && !player.paused) {
          if (player.state !== "CONNECTED") player.connect();

          if (!player.voiceChannel) {
            player.setVoiceChannel(voice_channel.id);
            player.connect();
          }

          player.play();
        }

        return message.channel.send(
          `Песня **${res.tracks[0].title}** добавлена в очередь!`
        );
    }
  },
};

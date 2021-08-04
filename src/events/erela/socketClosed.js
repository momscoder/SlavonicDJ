module.exports = (client, player, socket) => {
  // reconnect on "Abnormal closure"
  if (socket.code == 1006) {
    const voiceChannel = player.voiceChannel;
    const textChannel = player.textChannel;

    try {
      player.disconnect();
    } catch {}

    setTimeout(() => {
      player.setVoiceChannel(voiceChannel);
      player.setTextChannel(textChannel);

      player.connect();
      setTimeout(() => {
        player.pause(false);
      }, 500);
    }, 500);
  }
};

// https://github.com/nik9play/vk-music-bot/blob/next/src/index.js#L110

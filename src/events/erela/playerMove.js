module.exports = (client, player, initChannel, newChannel) => {
  client.manager.voiceChannel = newChannel;
  if (!newChannel) {
    if (client.timers.has(player.guild.id))
      clearTimeout(client.timers.get(player.guild.id));
    return player.destroy();
  }
  player.voiceChannel = newChannel;
  setTimeout(() => player.pause(false), 2000);
};

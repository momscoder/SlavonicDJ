module.exports = (Discord, client, channel) => {
  const player = client.manager.get(channel.guild.id);
  if (player && player.textChannel === channel.id) {
    player.destroy();

    if (client.timers.has(channel.guild.id))
      clearTimeout(client.timers.get(channel.guild.id));
  }
};

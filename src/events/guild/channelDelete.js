module.exports = (Discord, client, channel) => {
  const player = client.manager.get(channel.guild.id);
  if (player && player.textChannel === channel.id) {
    player.destroy();
  }
};

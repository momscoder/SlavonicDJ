module.exports = (Discord, client, guild) => {
  const player = client.manager.get(guild.id);
  if (player) player.destroy();

  if (client.timers.has(guild.id)) clearTimeout(client.timers.get(guild.id));
};

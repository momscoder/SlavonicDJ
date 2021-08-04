module.exports = (client, player, track) => {
  const channel = client.channels.cache.get(player.textChannel);
  channel
    .send(`Песня **${track.title}** будет пропущена из-за ошибки`)
    .then((msg) => msg.delete({ timeout: 15000 }).catch(console.error))
    .catch(console.error);
  console.log(track);
};

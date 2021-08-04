module.exports = (client, player, track) => {
  const channel = client.channels.cache.get(player.textChannel);
  channel.send(`Сейчас играет: *${track.title}* [${track.requester}]`);
};

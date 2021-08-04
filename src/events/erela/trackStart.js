module.exports = (client, player, track) => {
  const channel = client.channels.cache.get(player.textChannel);
  channel
    .send(`Сейчас играет: *${track.title}* [${track.requester}]`)
    .then((msg) => {
      if (msg.deletable)
        msg.delete({ timeout: track.duration }).catch(console.error);
    })
    .catch(console.error);
};

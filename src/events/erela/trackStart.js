module.exports = async (client, player, track) => {
  const channel = client.channels.cache.get(player.textChannel);
  if (player.prev_start_msg?.deletable) {
    player.prev_start_msg.delete().catch(console.error);
  }
  player.prev_start_msg = await channel.send(
    `Сейчас играет: *${track.title}* [${track.requester}]`
  );
};

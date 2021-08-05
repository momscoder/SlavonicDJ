module.exports = async (client, player, track) => {
  if (player.prev_start_msg?.deletable) {
    player.prev_start_msg.delete().catch(console.error);
  }
};

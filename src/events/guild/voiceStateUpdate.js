module.exports = (Discord, client, oldState, newState) => {
  if (
    oldState.channelID !== oldState.guild.me.voice.channelID ||
    newState.channel
  )
    return;

  if (oldState.channel?.members.size - 1 <= 0) {
    client.timers.set(
      oldState.guild.id,
      setTimeout(() => {
        const player = client.manager.get(oldState.guild.id);
        if (player) {
          oldState.guild.channels.cache
            .get(player.textChannel)
            .send(`**Слишком долгое время ожидания, отключаюсь.**`)
            .then((msg) => msg.delete({ timeout: 15000 }));
          player.destroy();
        }
      }, 300000)
    );
  }
};

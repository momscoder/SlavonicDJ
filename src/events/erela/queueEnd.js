module.exports = (client, player) => {
  if (player)
    client.timers.set(
      player.guild,
      setTimeout(async () => {
        if (player) {
          const channel = client.channels.cache.get(player.textChannel);
          channel
            .send(`**Слишком долгое время ожидания, отключаюсь.**`)
            .then((msg) => msg.delete({ timeout: 30000 }).catch(console.error))
            .catch(console.error());
          player.destroy();
        }
      }, 60000)
    );
};

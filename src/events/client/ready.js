module.exports = (Discord, client) => {
  client.manager.init(client.user.id);
  console.log(`Bot is Online as ${client.user.tag}!`);
};

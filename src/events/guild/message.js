require("dotenv").config();

module.exports = (Discord, client, message) => {
  const prefix = process.env.DS_PREFIX;
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command =
    client.commands.get(cmd) ||
    client.commands.find((x) => x.aliases && x.aliases.includes(cmd));

  if (!command) return message.reply("Такой команды нет!");

  try {
    command.execute(message, args, cmd, client, Discord);
  } catch (err) {
    message.reply("Ошибка исполнения команды :(");
    console.log(err); //TODO: logger
  }
};

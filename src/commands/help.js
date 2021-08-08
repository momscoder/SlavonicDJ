const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h", "info", "commands"],
  description: "Показывает справку",
  async execute(message, args) {
    const prefix = message.client.prefix;

    if (!args.length) {
      const embed = new MessageEmbed()
        .setAuthor("Справка")
        .setFooter(`Для побробной информации: ${prefix}help <command>`);
      message.client.commands.forEach((command) =>
        embed.addField(`${prefix}${command.name}`, command.description)
      );

      return message.channel.send(embed);
    }

    const command = message.client.commands.get(args[0].toLowerCase());
    if (!command) return message.reply("Такой команды нет!");

    //TODO: make it more informative (usage, examples, etc)
    return message.channel.send(
      `**${prefix}${command.name}**: ${
        command.description
      }.\nТакже может быть вызвана при помощи: ${command.aliases.join(", ")}.`
    );
  },
};

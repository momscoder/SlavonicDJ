const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h", "info", "commands"],
  description: "Показывает справку",
  cooldown: 1,
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
    const examples = command.examples;
    const usage = command.usage;
    return message.channel.send(
      `**${prefix}${command.name}**: ${command.description}.\n${
        usage ? `Параметры: ${prefix}${command.name} ${usage}\n` : ""
      }${
        examples
          ? `Например: ${examples
              .map((s) => `${prefix}${command.name} ${s}`)
              .join(", ")}\n`
          : ""
      }Также может быть вызвана при помощи: ${command.aliases.join(", ")}.`
    );
  },
};

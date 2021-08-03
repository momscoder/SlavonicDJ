const fs = require("fs");

module.exports = (client, Discord) => {
  const load_dir = (dir) => {
    const event_files = fs
      .readdirSync(`${__dirname}/../events/${dir}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of event_files) {
      const event = require(`../events/${dir}/${file}`);
      const event_name = file.split(".")[0];
      client.on(event_name, event.bind(null, Discord, client));
    }
  };

  ["client", "guild"].forEach((dir) => load_dir(dir));
};

require('dotenv').config();
const Discord = require("discord.js");
const bot = new Discord.Client();

const fetch = require("node-fetch");
const config = require("./config.json");

bot.on("ready", async () => {
  bot.user
    .setPresence({
      activity: {
        name: `channels in ${bot.guilds.cache.size} servers`,
        type: "WATCHING",
      },
      status: "online",
    })
    .catch((err) => bot.logger.log(err, "error"));
  
  setInterval(() => {
    bot.user.setPresence({
      activity: {
        name: `channels in ${bot.guilds.cache.size} servers`,
        type: "WATCHING",
      },
      status: "online",
    });
    console.log(bot.guilds.cache.size);
  }, 1 * 60 * 60 * 1000); // hour * minutes * seconds * milliseconds
  console.log(`Connected! Discord.js ${Discord.version}, monitoring ${bot.guilds.cache.size} servers.`);
});

bot.on("message", async (message) => {
  if (message.channel.type === "news") {
    await fetch(
      `https://discord.com/api/v6/channels/${message.channel.id}/messages/${message.id}/crosspost`,
      {
        method: "POST",
        headers: {
          Authorization: `Bot ${process.env.TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => console.log(json));
  }
});

bot.login(process.env.TOKEN);